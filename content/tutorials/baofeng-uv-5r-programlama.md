---
title: Baofeng UV-5R Programlama Rehberi (CHIRP)
description: >-
  Baofeng UV-5R, UV-5R Plus, UV-82, BF-F8HP modelleri için CHIRP-next ile adım
  adım programlama, CSV import, kanal kapasitesi, sürücü kurulumu ve sık
  sorunlar.
keywords:
  - baofeng
  - uv-5r
  - chirp
  - programlama
  - csv
article_section: baofeng
published_at: '2026-04-25'
updated_at: '2026-04-25'
faq:
  - q: '`Radio did not respond`'
    a: 'VFO mode, kötü kabarn, sürücü yok'
  - q: Yarıda kesildi
    a: Pil zayıf
  - q: Yüklemeden sonra bazı kanal boş
    a: 'CSV `;` ayraçlı, CHIRP `,` bekliyor'
  - q: Tone Mode `Tone` ama röle açılmıyor
    a: Yanlış ton frekansı
  - q: 'Anten taktım, çıkış sıfır'
    a: 'Stock anten kötü, yandı'
  - q: TX'te ses bozuk
    a: Mic ayarı yanlış
  - q: Bandwidth W/N karışıklığı
    a: TR amatör NFM (N)
extra_json_ld:
  - '@context': 'https://schema.org'
    '@type': HowTo
    name: Baofeng UV-5R Programlama Rehberi (CHIRP)
    description: >-
      Baofeng UV-5R, UV-5R Plus, UV-82, BF-F8HP modelleri için CHIRP-next ile
      adım adım programlama, CSV import, kanal kapasitesi, sürücü kurulumu ve
      sık sorunlar.
    inLanguage: tr-TR
    totalTime: PT35M
    step:
      - '@type': HowToStep
        position: 1
        name: Sürücü kurulumu
        text: |-
          ### Windows

          1. Kabloyu USB'ye bağla → Aygıt Yöneticisi (Device Manager) aç
          2. "Bilinmeyen aygıt" varsa, kablo modeline göre:
             - **PL2303 (Prolific):** [prolific.com.tw](https://www.prolific.com.tw/US/ShowProduct.aspx?p_id=225) → win10 driver
             - **FTDI:** [ftdichip.com](https://ftdichip.com/drivers/) → VCP driver
          3. Yükle → COM port atanır (örn. COM3)

          ### macOS

          PL2303 için (Apple Silicon / Intel):
          ```bash
          # Apple silicon Macbook için 2024+ PL2303 native:
          ls /dev/cu.usbserial-*
          ```

          `/dev/c
        url: >-
          https://amator.tr/tutorials/baofeng-uv-5r-programlama#adim-1-surucu-kurulumu
      - '@type': HowToStep
        position: 2
        name: CHIRP-next'i indir ve hazırla
        text: >-
          [chirpmyradio.com](https://chirpmyradio.com) → "next" sürümü (Stable
          terkedildi, "next" güncel).


          **Tek tek macOS notu:** "App is damaged" hatası alabilirsin (signing
          issue):

          ```bash

          xattr -d com.apple.quarantine /Applications/CHIRP-next.app

          ```
        url: >-
          https://amator.tr/tutorials/baofeng-uv-5r-programlama#adim-2-chirp-next-i-indir-ve-hazirla
      - '@type': HowToStep
        position: 3
        name: Telsizi bağla + indir
        text: >-
          1. Telsizi **kapat** → kabloyu üst hoparlör jakına sıkı bastır → USB
          ucu bilgisayara

          2. Telsizi **aç** → ekranda normal başlangıç ekranı (frekans + status)

          3. CHIRP'te **Radio → Download from radio**

          4. Port: COM3 / `/dev/cu.usbserial-...` / `/dev/ttyUSB0`

          5. Vendor: **Baofeng**, Model: **UV-5R** (BF-F8HP için ayrı seçenek)

          6. **OK** → 30-60 sn → 128 kanal tablo gelir


          > **"Radio did not respond"** hatası alıyorsan: telsiz kanalda mı?
          Frekansta mı? VFO modunda mı? Bazıları "VFO mode"da indirme r
        url: >-
          https://amator.tr/tutorials/baofeng-uv-5r-programlama#adim-3-telsizi-bagla-indir
      - '@type': HowToStep
        position: 4
        name: Röle CSV'sini hazırla
        text: >-
          [amator.tr/role-export/](/role-export/) sayfasında:


          1. **Cihaz**: "Baofeng UV-5R / UV-82 / BF-F8HP" — uygun olanı seç

          2. **TA bölgesi**: ikamet ettiğin bölge (TA1, TA2...)

          3. **Bant**: VHF + UHF

          4. **Mod**: Analog FM

          5. **Aktif**: ✓

          6. **CSV indir** → `roleler.csv`


          UV-5R sütun şablonu CHIRP standardıyla aynı; tüm sütunlar otomatik
          tanınır.
        url: >-
          https://amator.tr/tutorials/baofeng-uv-5r-programlama#adim-4-role-csv-sini-hazirla
      - '@type': HowToStep
        position: 5
        name: CSV'yi CHIRP'e import et
        text: |-
          1. **File → Import**
          2. `roleler.csv` seç
          3. CHIRP sütun eşleştirmesi diyaloğu — UV-5R için zaten otomatik:
             - `Frequency` → RX
             - `Duplex` → +/- shift yön
             - `Offset` → shift miktarı (örn. 0.6 MHz)
             - `Tone` → CTCSS TX
             - `Tone Squelch` → CTCSS RX
             - `Mode` → FM/NFM
          4. Hangi kanal aralığını import edeceksin (örn. 1-100)
          5. **OK** → tabloya kanallar yüklenir
        url: >-
          https://amator.tr/tutorials/baofeng-uv-5r-programlama#adim-5-csv-yi-chirp-e-import-et
      - '@type': HowToStep
        position: 6
        name: Manuel ince ayar
        text: >-
          | Sütun | Tipik değer |

          |---|---|

          | Tone Mode | `Tone` (TX-only CTCSS) |

          | TX Power | `Low` (1W) — pil ömrü ⬆ |

          | Skip | `S` (kullanılmayan kanalda — taramada atlar) |

          | Bandwidth | `NFM` (12.5 kHz amatör standart) |


          UV-5R menü ayarları (telsizden direkt):

          - **MENU 0 (SQL)**: Squelch — 3-5 (10 = en sıkı)

          - **MENU 1 (STEP)**: 12.5 kHz (amatör standart)

          - **MENU 2 (TXP)**: TX Power

          - **MENU 13 (BCL)**: Busy Channel Lock — meşgul kanalda TX engelle
          (etik)

          - **MENU 14 (BEEP)**: Tuş sesi açma/kapama
        url: >-
          https://amator.tr/tutorials/baofeng-uv-5r-programlama#adim-6-manuel-ince-ayar
      - '@type': HowToStep
        position: 7
        name: Telsize geri yükle
        text: >-
          1. **Radio → Upload to radio**

          2. Onay → 60-90 sn → telsiz kendiliğinden başlar


          > **Yarıda kesilirse:** Pil ≥%50 olmalı; kabloyu sıkı tut; bağlantı
          tekrar.
        url: >-
          https://amator.tr/tutorials/baofeng-uv-5r-programlama#adim-7-telsize-geri-yukle
---
## Baofeng UV-5R neden hâlâ popüler?

Baofeng UV-5R 2012'de piyasaya çıktı; **dünyanın en çok satan ucuz amatör telsizi** unvanını yıllardır koruyor. Quansheng UV-K5'in (~700-1000 TL, 2023+) gelmesiyle "tek ucuz seçenek" olmaktan çıktı, ama UV-5R hâlâ:

-   **350-600 TL** civarı (UV-K5'ten ucuz)
-   **VHF + UHF** dual-band (2m + 70cm)
-   **128 kanal** kapasitesi
-   **Türkiye'de yaygın** — yedek parça, anten, kablo bol
-   Sağlam (telsiz olarak basit, az şeyi bozulur)
-   **CHIRP-next ile native destek** (özel driver gerekmez, UV-K5 F4HWN'in aksine)

UV-K5'le karşılaştırma:

| Özellik | Baofeng UV-5R | Quansheng UV-K5 (F4HWN) |
| --- | --- | --- |
| Fiyat | 350-600 TL | 700-1200 TL |
| Kanal | 128 | 200 stock / 999 F4HWN |
| Custom firmware | Yok (close source) | F4HWN tam açık |
| Geniş bant RX | 65-108 + 136-174 + 400-520 | 15-1300 MHz F4HWN |
| Spektrum analizci | Yok | F4HWN'de var |
| Pil ömrü | 8-12 saat | 10-14 saat |
| Yedek parça | Çok bol | Görece az |
| Programlama | CHIRP standart, kolay | F4HWN için armel CHIRP driver gerek |

**Tavsiye:** İlk telsizinse UV-5R yeter. Hacker / hobi merakı varsa UV-K5'i tercih et.

## UV-5R model varyantları

| Model | Çıkış gücü | Açıklama |
| --- | --- | --- |
| **UV-5R** klasik | 4W (high) | Orijinal, 2012 model, hâlâ üretiliyor |
| **UV-5R Plus / V2+** | 4W | Renkli LCD, daha iyi RF |
| **UV-5RA / UV-5RE / UV-5R+** | 4W | Kozmetik varyantlar; iç organlar aynı |
| **BF-F8HP** | 8W | Yüksek güç, ABD pazarı |
| **BF-F9HP V2+** | 8W | F8HP halefi |
| **UV-82** | 8W (yeni) / 5W (eski) | Daha büyük PTT, daha iyi anten yuvası |
| **UV-82HP** | 8W | UV-82'nin yüksek güçlü versiyonu |
| **GT-3TP / GT-3 MarkIII** | 1/4/8W ayarlanabilir | F8HP'nin ETHmark'ı |
| **DM-1701 / DM-32 (DMR)** | 5W | DMR dijital — bu rehber kapsamı dışı |

Hepsi aynı CHIRP driver'ını kullanır (model: "Baofeng UV-5R" veya "Baofeng BF-F8HP"). Sadece güç sınırı + kozmetik fark.

## Hazırlıklar

| İhtiyaç | Açıklama | Yaklaşık fiyat |
| --- | --- | --- |
| **Programlama kablosu** | Baofeng K1 standart 2-pin (Kenwood K1 ile uyumlu); FTDI veya Prolific PL2303 chip | 100-200 TL |
| **USB sürücü** | FTDI / PL2303 — Windows için manuel; macOS/Linux in-tree | (yazılım, ücretsiz) |
| **CHIRP-next** | [chirpmyradio.com](https://chirpmyradio.com) | ücretsiz |
| **Röle CSV'si** | [amator.tr/role-export/](/role-export/) — UV-5R hazır profili | (siteden) |

> **Dikkat:** **Sahte FTDI çipli kablolar** Windows 10/11'de "FTDIChip-IT" tarafından bricklenebilir (eski olay). 2024+ kablolarda PL2303 daha güvenli. Mac/Linux'ta sorun yok.

## Adım 1: Sürücü kurulumu

### Windows

1.  Kabloyu USB'ye bağla → Aygıt Yöneticisi (Device Manager) aç
2.  "Bilinmeyen aygıt" varsa, kablo modeline göre:
    -   **PL2303 (Prolific):** [prolific.com.tw](https://www.prolific.com.tw/US/ShowProduct.aspx?p_id=225) → win10 driver
    -   **FTDI:** [ftdichip.com](https://ftdichip.com/drivers/) → VCP driver
3.  Yükle → COM port atanır (örn. COM3)

### macOS

PL2303 için (Apple Silicon / Intel):

```bash
# Apple silicon Macbook için 2024+ PL2303 native:
ls /dev/cu.usbserial-*
```

`/dev/cu.usbserial-XXXX` görünmeli. Eski PL2303HXA chip'leri Big Sur+ tanımıyor; **PL2303 GC** veya **PL2303 GD** gerekir. FTDI macOS'ta tüm sürümlerde çalışır.

### Linux

Native — `dmesg` ile:

```bash
dmesg | tail -5
# [12345.6789] usb 1-2: pl2303 converter now attached to ttyUSB0
```

`/dev/ttyUSB0` veya `/dev/ttyACM0` olarak görünür.

## Adım 2: CHIRP-next'i indir ve hazırla

[chirpmyradio.com](https://chirpmyradio.com) → "next" sürümü (Stable terkedildi, "next" güncel).

**Tek tek macOS notu:** "App is damaged" hatası alabilirsin (signing issue):

```bash
xattr -d com.apple.quarantine /Applications/CHIRP-next.app
```

## Adım 3: Telsizi bağla + indir

1.  Telsizi **kapat** → kabloyu üst hoparlör jakına sıkı bastır → USB ucu bilgisayara
2.  Telsizi **aç** → ekranda normal başlangıç ekranı (frekans + status)
3.  CHIRP'te **Radio → Download from radio**
4.  Port: COM3 / `/dev/cu.usbserial-...` / `/dev/ttyUSB0`
5.  Vendor: **Baofeng**, Model: **UV-5R** (BF-F8HP için ayrı seçenek)
6.  **OK** → 30-60 sn → 128 kanal tablo gelir

> **"Radio did not respond"** hatası alıyorsan: telsiz kanalda mı? Frekansta mı? VFO modunda mı? Bazıları "VFO mode"da indirme reddeder; **Channel mode'a** al ve tekrar dene. Veya squelch'i 0'a düşür.

## Adım 4: Röle CSV'sini hazırla

[amator.tr/role-export/](/role-export/) sayfasında:

1.  **Cihaz**: "Baofeng UV-5R / UV-82 / BF-F8HP" — uygun olanı seç
2.  **TA bölgesi**: ikamet ettiğin bölge (TA1, TA2...)
3.  **Bant**: VHF + UHF
4.  **Mod**: Analog FM
5.  **Aktif**: ✓
6.  **CSV indir** → `roleler.csv`

UV-5R sütun şablonu CHIRP standardıyla aynı; tüm sütunlar otomatik tanınır.

## Adım 5: CSV'yi CHIRP'e import et

1.  **File → Import**
2.  `roleler.csv` seç
3.  CHIRP sütun eşleştirmesi diyaloğu — UV-5R için zaten otomatik:
    -   `Frequency` → RX
    -   `Duplex` → +/- shift yön
    -   `Offset` → shift miktarı (örn. 0.6 MHz)
    -   `Tone` → CTCSS TX
    -   `Tone Squelch` → CTCSS RX
    -   `Mode` → FM/NFM
4.  Hangi kanal aralığını import edeceksin (örn. 1-100)
5.  **OK** → tabloya kanallar yüklenir

## Adım 6: Manuel ince ayar

| Sütun | Tipik değer |
| --- | --- |
| Tone Mode | `Tone` (TX-only CTCSS) |
| TX Power | `Low` (1W) — pil ömrü ⬆ |
| Skip | `S` (kullanılmayan kanalda — taramada atlar) |
| Bandwidth | `NFM` (12.5 kHz amatör standart) |

UV-5R menü ayarları (telsizden direkt):

-   **MENU 0 (SQL)**: Squelch — 3-5 (10 = en sıkı)
-   **MENU 1 (STEP)**: 12.5 kHz (amatör standart)
-   **MENU 2 (TXP)**: TX Power
-   **MENU 13 (BCL)**: Busy Channel Lock — meşgul kanalda TX engelle (etik)
-   **MENU 14 (BEEP)**: Tuş sesi açma/kapama
-   **MENU 25 (TOT)**: Time-out timer (uzun yayını otomatik keser, varsayılan 60 sn iyi)
-   **MENU 33 (SCAN)**: Tarama modu

## Adım 7: Telsize geri yükle

1.  **Radio → Upload to radio**
2.  Onay → 60-90 sn → telsiz kendiliğinden başlar

> **Yarıda kesilirse:** Pil ≥%50 olmalı; kabloyu sıkı tut; bağlantı tekrar.

## Sık sorunlar

| Belirti | Sebep | Çözüm |
| --- | --- | --- |
| `Radio did not respond` | VFO mode, kötü kabarn, sürücü yok | Channel mode'a al; Zadig sürücü kontrolü |
| Yarıda kesildi | Pil zayıf | Şarj edip tekrar dene |
| Yüklemeden sonra bazı kanal boş | CSV `;` ayraçlı, CHIRP `,` bekliyor | CSV'yi tekrar üret veya Excel ile düzelt |
| Tone Mode `Tone` ama röle açılmıyor | Yanlış ton frekansı | TR rölelerinde 77/88.5/100/127.3 yaygın — listeye bak |
| Anten taktım, çıkış sıfır | Stock anten kötü, yandı | Yedek anten al (Nagoya NA-771 popüler) |
| TX'te ses bozuk | Mic ayarı yanlış | MENU 23 (VOX) OFF, mic gain 5 |
| Bandwidth W/N karışıklığı | TR amatör NFM (N) | Tüm kanalları N'e çevir |

## Anten yükseltmesi

Stock UV-5R anten **kötüdür**. İlk yükseltme aday: **Nagoya NA-771** (~250 TL, 38 cm uzun fleksibıl, VHF/UHF dual). 6-9 dB iyileştirme verir, menzili **2-3× artırır**.

Alternatifler:

-   **Diamond SRH-77CA** — kompakt, amatör pratiği için iyi (~400 TL)
-   **DIY J-Pole** — sabit istasyon: bkz. [Anten Yapımı](/tutorials/anten-yapimi-temel)

## Pil bakımı

-   UV-5R Li-ion pil **2-3 yılda kapasitesi düşer**; yedek pil ucuzdur (~150 TL).
-   **Tam deşarjdan kaçın** — %10'un altına bırakma, ömrü kısalır.
-   Şarj edici **otomatik dolduğunda kesmiyor olabilir** — uzun süreli kalırsa pil şişmesi riski.
-   Acil durum için pil yedek + AA pil yuvası adapter (Baofeng BL-5 alternatif) bulundur.

## Hazır CSV kaynakları (TR amatör)

-   **TA1LSX**: [ta1lsx.com - Baofeng kanal kayıt dosyaları](https://www.ta1lsx.com/baofeng-ve-bazi-telsiz-modellerin-hazir-kanal-ve-role-kayit-dosyalari/)
-   **TA2WK**: [ta2wk.com - Baofeng röle dosyaları](https://www.ta2wk.com/baofeng-ve-bazi-telsiz-modellerin-hazir-kanal-ve-role-kayit-dosyalari/)
-   **amator.tr**: [/role-export/](/role-export/) — dinamik, güncel

## Resmi kullanım kılavuzu

İngilizce manual: [baofengradio.com/uv-5r](https://baofengradio.com) (resmi)

Türkçe açıklamalı menü: [TA2BUX Baofeng menü](https://ta2bux.com/baofeng-menu-anlatimi/)

## Yararlı kaynaklar

-   [chirpmyradio.com](https://chirpmyradio.com) — yazılım indirme
-   [TA2BUX Baofeng menü anlatımı](https://ta2bux.com/baofeng-menu-anlatimi/)
-   [TA1LSX röle dosyaları](https://www.ta1lsx.com/baofeng-ve-bazi-telsiz-modellerin-hazir-kanal-ve-role-kayit-dosyalari/)
-   [PwnLab UV-5R başlangıç kılavuzu](https://pwnlab.me/konular/baofeng-uv-5r-baslangic-ayarlari-ve-programlama-kilavuzu.626/)
-   [Türkçe CHIRP video kılavuzu](https://www.youtube.com/watch?v=K0dM0q8ZoRc)
-   [Telsiz programlama kapsamlı](https://baofengtelsiz.com/Telsiz-Programlama)

## UV-5R'den UV-K5'e geçiş

UV-K5'i sevdiğinizde:

-   UV-5R kanal listesini CSV olarak export edip yedekleyin (`File → Export → CSV`)
-   UV-K5'in F4HWN'ine import edin
-   Aynı CSV iki cihazda paralel kullanılabilir

UV-K5 daha gelişmiş ama UV-5R hâlâ değerli **yedek telsiz** olarak. Acil çantanızda her ikisi de bulunsun.

## Sıradaki adımlar

-   [Quansheng UV-K5 Programlama](/tutorials/uv-k5-programlama) — F4HWN ile karşılaştırma
-   [J-Pole Anten Yapımı](/tutorials/anten-yapimi-temel) — UV-5R menzilini 3× büyütme
-   [Röle Nedir](/tutorials/role-nedir) — duplex shift, CTCSS pratikleri
-   [APRS Nedir](/tutorials/aprs-nedir-nasil-kullanilir) — UV-5R + Mobilinkd TNC ile APRS

73, ve TR genelinde nice QSO'lar!
