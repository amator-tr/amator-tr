---
title: Quansheng UV-K5 Programlama Rehberi (F4HWN Firmware)
description: >-
  Quansheng UV-K5'i F4HWN custom firmware ile flashlemek, armel'in özel CHIRP
  driver'ı ile programlamak, röle CSV yüklemek ve EEPROM yedeği almak için tam
  rehber.
keywords:
  - uv-k5
  - programlama
  - chirp
  - quansheng
  - f4hwn
  - firmware
article_section: uv-k5
published_at: '2026-04-25'
---
## UV-K5 nedir, neden bu kadar popüler?

Quansheng UV-K5, 2023'te piyasaya çıkan **VHF/UHF dual-band**, ~700-1200 TL bandında satılan ucuz bir Çin amatör el telsizidir. Donanımı (BK4819 RF SoC) "açılabilir" — DualTachyon adlı geliştirici 2023 sonunda **firmware'in tam reverse-engineered + open-source bir uygulamasını** yayınladı: [DualTachyon/uv-k5-firmware](https://github.com/DualTachyon/uv-k5-firmware) (Apache 2.0).

Bu açılış sayesinde topluluk birkaç ay içinde stock cihazda olmayan onlarca özelliği eklemiş custom firmware'ler yayımladı:

-   **Geniş bant alıcı** (15-1300 MHz, ham bantlar dışı dinleme)
-   **AM modülasyon düzeltmesi** (AM-fix — orijinal stock'ta AM resepsiyonu kötüydü)
-   **Spektrum analizci** ([fagci](https://github.com/fagci/uv-k5-firmware-fagci-mod) tarafından)
-   **SSB demodülasyonu** (Single Sideband — donanım sınırlarıyla ama çalışır)
-   **999 kanal kapasitesi** (stock 200)
-   **Daha iyi kanal arama** (LiveSeek, dual-watch)
-   **Ek modülasyon modları** (USB/LSB)

## Hangi firmware'i seçmeliyim?

Bu rehber **F4HWN** (callsign'ı F4HWN olan **Armel** isimli geliştirici tarafından maintain edilen) varyantı temel alır. F4HWN, Egzumer fork'unun üzerine OneOfEleven'ın modlarını + fagci spektrum analizcisini + kendi iyileştirmelerini ekleyen, **tam kapsamlı topluluk firmware'i**dir.

### Resmi repolar

-   **UV-K5 / UV-K5(8) / UV-5R Plus (BK4819 + DP32G030 MCU):** → [github.com/armel/uv-k5-firmware-custom](https://github.com/armel/uv-k5-firmware-custom)
-   **UV-K1 / UV-K5 v3 (yeni nesil PY32F071 MCU, 2025+ üretim):** → [github.com/armel/uv-k1-k5v3-firmware-custom](https://github.com/armel/uv-k1-k5v3-firmware-custom) ("F4HWN Fusion Edition" — 2026'da v5.2.0 yayımlandı)
-   **CHIRP driver (programlama için zorunlu):** → [github.com/armel/uv-k5-chirp-driver](https://github.com/armel/uv-k5-chirp-driver)

> **Önemli:** Stock CHIRP-next'in "Quansheng UV-K5" sürücüsü **F4HWN ile UYUMSUZ** — F4HWN'in genişletilmiş hafıza haritasını okuyamaz. Aşağıdaki adımlarda armel'in özel sürücüsünü manuel ekleyeceğiz.

### Hangi cihazım var nereden anlarım?

Telsizi **kapat → PTT + Side-1 (üst yan tuş)** basılı tutarak aç. LCD'de seri numara + chip kimliği görünür:

| Görünen MCU | Cihaz | Firmware repo |
| --- | --- | --- |
| `K5 V2` veya `K5(8)` (DP32G030) | UV-K5, UV-K5(8), UV-5R Plus, UV-G6 | `armel/uv-k5-firmware-custom` |
| `K5 V3` veya `UV-K1` (PY32F071) | UV-K1, UV-K5 v3 (1000 kanal) | `armel/uv-k1-k5v3-firmware-custom` (Fusion) |

Yanlış firmware'i flashlamak cihazı bricklemez (her iki MCU'da bootloader var) ama **çalışmaz** ve geri stock'a almanız gerekir.

## Hazırlıklar

| İhtiyaç | Açıklama |
| --- | --- |
| Programlama kablosu | Quansheng K5 special pinout (3.5mm 4-segment + 2.5mm). **TYT/Baofeng kabloları uyumsuz.** ~80-150 TL |
| USB sürücü | CH340 / PL2303 / FTDI — Windows için manuel kurulum gerek; macOS Big Sur+ ve Linux'ta in-tree. `dmesg` veya `ioreg` ile cihaz adını görebilirsiniz (`/dev/cu.usbserial-XXXX`) |
| **k5prog** | EEPROM backup/restore tool. Repo: [sq5bpf/k5prog](https://github.com/sq5bpf/k5prog) — `git clone && make`. Mac'te `brew install` yok, manuel build |
| Web flasher (opsiyonel) | Tarayıcıdan flash: [whosmatt.github.io/uvmod](https://whosmatt.github.io/uvmod/) — Chrome/Edge gerek (Web Serial API) |
| **CHIRP-next** | [chirpmyradio.com](https://chirpmyradio.com) — "next" sürümü |
| **armel CHIRP driver** | [armel/uv-k5-chirp-driver](https://github.com/armel/uv-k5-chirp-driver) → ZIP indir |
| Röle CSV'si | [amator.tr/role-export/](/role-export/) → cihaza özel hazır profil |

## Adım 1: EEPROM yedeği al (atlamayın)

F4HWN'i flashlamadan **stock EEPROM'u yedekle** — geri dönmek istediğinizde gerekecek (kalibrasyon değerleri, fabrika frekans ofsetleri).

```bash
# k5prog'u build ettikten sonra:
./k5prog -f -r -B uv-k5-stock-eeprom-backup.bin
```

(`-f` = full read, `-r` = read mode, `-B` = bin dosyası.) Yaklaşık 2-3 dakika sürer, 64 KB dosya çıkar. Bu dosyayı **kaybetme** — bulutta yedekle.

## Adım 2: F4HWN firmware'i flashla

### Yöntem A: Web flasher (en kolay, Chrome/Edge)

1.  Telsizi **kapat → PTT basılı tutarak aç** → ekranda "Bootloader Mode" görünür.
2.  Programlama kablosunu USB'ye tak.
3.  [whosmatt.github.io/uvmod](https://whosmatt.github.io/uvmod/) → **"Connect"** → portu seç.
4.  **"Choose firmware"** → armel repo'sunun [Releases](https://github.com/armel/uv-k5-firmware-custom/releases) sayfasından en yeni `.bin` dosyasını seç (örn. `f4hwn_v5.2.0.bin`).
5.  **"Flash"** → ~30 sn → tamamlandığında telsiz kendiliğinden başlar.

### Yöntem B: k5prog CLI (gelişmiş, Mac/Linux)

```bash
./k5prog -f -w -F f4hwn_v5.2.0.bin
```

(`-w` = write, `-F` = firmware bin.)

Flash sonrası ekran F4HWN açılışı + version bilgisi gösterir.

## Adım 3: armel'in özel CHIRP driver'ını yükle

Stock CHIRP-next F4HWN'i tanımaz. Driver'ı manuel eklemek gerek:

1.  [armel/uv-k5-chirp-driver](https://github.com/armel/uv-k5-chirp-driver) → **Download ZIP** veya `git clone`.
2.  ZIP içindeki `uvk5_egzumer_f4hwn_v4_x.py` dosyasını CHIRP'in modül dizinine kopyala:
    -   **Windows:** `%APPDATA%\CHIRP\stock_configs\`
    -   **macOS:** `~/Library/Application Support/CHIRP/stock_configs/`
    -   **Linux:** `~/.local/share/CHIRP/stock_configs/`
    -   Veya CHIRP içinden: `Help` → `Load Module...` → `.py` dosyasını seç (sadece o oturum için)
3.  CHIRP'i kapat & aç. **Radio → Download from radio** menüsünde artık "Quansheng UV-K5 (egzumer + f4hwn)" seçeneği görünür.

## Adım 4: Telsizden mevcut konfigürasyonu indir

1.  Programlama kablosunu bağla (telsiz açık, normal modda — bootloader değil).
2.  CHIRP → **Radio → Download from radio**.
3.  Port: `/dev/cu.usbserial-XXXX` veya `COMx`.
4.  Vendor: **Quansheng** → Model: **UV-K5 (egzumer + f4hwn)**.
5.  **OK** → 60-90 sn → 999-satırlık kanal tablosu yüklenir.

> **İndir başarısızsa:** Cihazda menüden `Settings → Reset` yapma — bu kalibrasyonu siler. Önce kabloyu çıkar/tak, sürücüyü kontrol et, USB hub yerine doğrudan bilgisayara bağla.

## Adım 5: Röle CSV'sini hazırla

[amator.tr/role-export/](/role-export/) sayfasında:

1.  **Cihaz**: "Quansheng UV-K5 (F4HWN v4.3+)" veya "UV-K1 / K5 v3 (Fusion v5+, 1000 kanal)"
2.  **TA bölgesi**: ikamet ettiğiniz ile uygun bölge (TA1, TA2, ...)
3.  **Bant**: VHF + UHF
4.  **Mod**: Analog FM (DMR rölelerinizi ayrı tutun, kanal slotu kabarmaz)
5.  **Aktif**: ✓ (yalnızca aktif onaylı röleler)
6.  **Korunan veriler** (ops): Airband / Marine / PMR — parolayla
7.  **CSV indir** → `roleler.csv` (UTF-8, virgül-ayraçlı)

## Adım 6: CSV'yi CHIRP'e yükle

1.  CHIRP'te **File → Import** (yeni image gerekirse: New → Quansheng UV-K5 model'i).
2.  `roleler.csv` seç.
3.  CHIRP sütun eşleştirmesi sorabilir; röle export'umuz CHIRP standart sütunlarını kullandığı için otomatik tanır:
    -   `Frequency` → RX
    -   `Duplex`/`Offset` → shift yön + miktar
    -   `Tone Mode`, `rToneFreq`, `cToneFreq` → CTCSS TX/RX
    -   `Mode` → FM/NFM (12.5 kHz dar bant)
4.  Hangi kanal aralığını import edeceğinizi seçin (1-300 vb.).
5.  **OK** → kanallar tabloya yüklenir.

## Adım 7: Manuel ince ayar

CSV hazır olsa da kişisel tercihler için:

| Ayar | Önerilen |
| --- | --- |
| **Tone Squelch** (RX ton filtresi) | OFF — röleden gelen her şeyi duymak için |
| **DTMF/PTT-ID** | OFF — yanlışlıkla DTMF kod göndermeyi engeller |
| **TX Power** | 1W default; mesafe gerektikçe 5W'a çıkar (pil ömrü 2× fark eder) |
| **Bandwidth** | NFM (12.5 kHz) amatör standardı; AM kanallarında AM |
| **Skip** | Acil/zayıf röleleri `Skip = S` yaparak taramada hızlanırsınız |
| **Squelch** | 3-5 (10 = en sıkı, 0 = sürekli açık) |

**F4HWN'e özel menüler:**

-   **Battery save**: dinleme-açma çevriminde pil tasarrufu (1:4 oranı tipik)
-   **Compander**: ses dinamiklerini sıkıştırır, gürültülü kanallarda anlaşılırlık artar
-   **Roger beep / Voice prompt**: kapatabilirsiniz (etrafa duyulan beep'ler nötrleşir)
-   **Spectrum analyzer**: Menü → spektrum → freq aralığını gez, aktif sinyalleri gör

## Adım 8: Telsize geri yükle

1.  **Radio → Upload to radio**.
2.  Onay → 60-90 sn → telsiz kendiliğinden yeniden başlar.

> **Yarıda kesilirse:** Pil seviyesi düşük olabilir; şarj edip tekrar deneyin. Yarım yüklemeden sonra cihaz garip davranabilir — yeniden tam upload yapın, kalıcı hasar olası değil.

## Stock'a geri dönmek

Stock firmware'e dönmek isterseniz:

1.  [github.com/DualTachyon/uv-k5-firmware/releases](https://github.com/DualTachyon/uv-k5-firmware/releases) → "stock" `.bin` indir
2.  Web flasher veya k5prog ile flashla
3.  EEPROM'u yedek aldığınız `.bin`'den restore edin (kalibrasyon geri gelir):
    
    ```bash
    ./k5prog -f -w -B uv-k5-stock-eeprom-backup.bin
    ```
    

## Sık sorunlar ve çözümleri

| Belirti | Sebep | Çözüm |
| --- | --- | --- |
| `Failed to communicate with radio` | Sürücü, port, kablo | CH340/PL2303/FTDI sürücüsü kurulu mu? Başka USB porta tak. macOS Sequoia'da sistemden "İzin Ver" gerekebilir |
| Yarıda kesildi | Pil zayıf, kablo gevşek | Pil ≥%50 olmalı, kabloyu sıkı bağla, USB hub'ı atla |
| Bazı kanallar boş | CSV ayraç hatası | UTF-8 + virgül kontrol et; Excel "Save as CSV" sometimes ; ayraç yapar |
| `Module load failed` (CHIRP'te) | Yanlış driver dosyası | Doğru `.py`'yi indirip stock\_configs altına koy |
| Telsiz F4HWN açıyor ama kanal yok | İlk yüklemeden sonra fabrika reset gerekiyor | Menü → Reset → "All" değil sadece "Channels" |
| AM kanalı çatırdıyor | Stock RX yetersiz | F4HWN'in **AM-fix** menüsünü ON yap (Settings → Modulation) |
| Spektrum donuk | Spectrum mode buggy | Bekleme süresini düşür (Spectrum → DwellTime → Min) |

## Diğer kullanışlı F4HWN özellikleri

-   **Memory Recall (Ch + 1-9)**: hızlı kanal kısayolları
-   **VFO scan / Memory scan / Range scan**: 3 farklı tarama modu
-   **DTMF live decode**: PTT ile DTMF kod yakalar (acil iletişimde yararlı)
-   **Battery percentage**: stock 4 bar yerine % gösterimi
-   **NOAA / weather alert**: ABD bantlarına özgü, TR'de işlevsiz ama bypass için açık tutabilirsiniz

## Sıradaki adımlar

İlk QSO'nuza hazırsınız. Anten, ton ve röle kullanım pratiklerini iyileştirmek için:

-   [Amatör Telsiz Rölesi Nedir?](/tutorials/role-nedir) — duplex shift, CTCSS pratikleri
-   [CTCSS / DCS Tonları Açıklaması](/tutorials/ctcss-dcs-nedir) — F4HWN menüsünde Tone Mode = Tone vs TSQL ayrımı
-   [J-Pole ve Slim Jim Anten Yapımı](/tutorials/anten-yapimi-temel) — stock kauçuk antenden 6-9 dB iyileştirme

## Kaynaklar ve teşekkür

-   **Armel (F4HWN)** — F4HWN custom firmware maintainer'ı, ana kaynağımız
-   **Egzumer**, **OneOfEleven**, **fagci** — daha önceki fork'ların geliştiricileri
-   **DualTachyon** — orijinal açık firmware
-   **sq5bpf** — k5prog
-   **whosmatt** — web flasher
-   **CHIRP topluluğu** — radyo programlama yazılımı

Tümü gönüllü çalışma + Apache 2.0/GPL açık lisans. Donanım çinli ucuz, yazılım Avrupalı topluluk — alternatif open-hardware/software örneği.

73, iyi QSO'lar!
