---
title: FT8 Nedir? Düşük Güçle Dünyayla Konuşma — WSJT-X Rehberi
description: >-
  FT8 dijital modu — nasıl çalışır, neden 5W ile dünyayı açar, WSJT-X kurulumu,
  donanım gereksinimleri, frekanslar, zaman senkronu ve ilk QSO için tam
  başlangıç rehberi.
keywords:
  - ft8
  - wsjt-x
  - hf
  - dijital-mod
  - qrp
  - dx
article_section: ft8
published_at: '2026-04-25'
updated_at: '2026-04-25'
---
## FT8 nedir, neden bu kadar popüler?

**FT8** — _Franke-Taylor design, 8-FSK modulation_ — 2017'de Nobel ödüllü astrofizikçi **Joe Taylor (K1JT)** ve Steve Franke (K9AN) tarafından duyurulan, **zayıf sinyal HF dijital iletişim modu**. Birkaç yıl içinde amatör radyo dünyasında "en popüler dijital mod" konumuna geldi: 2024 itibariyle [PSK Reporter](https://pskreporter.info/) verilerine göre **dünya çapında dijital trafiğin %70'inden fazlası FT8**.

### Neden bu kadar dikkat çekti?

-   **Çok düşük güçle (5-10 W) kıtalararası bağlantı** mümkün — "QRP DX"in en kolay yolu
-   **−24 dBSNR'a kadar dekod** edilebilir — gürültünün altındaki sinyal anlaşılır (insan kulağı CW'de bile en iyi −18 dB)
-   **15 saniyelik tek QSO** — uzun konuşmaya gerek yok, 1-2 dakikada bir kontak biter
-   **Otomatik** — yazılım kontak yönetir, sadece "Gönder" butonu
-   **Şehir içinde, küçük antenle, gürültülü ortamda çalışır** — apartman amatörleri için altın
-   **Online doğrulama:** [LoTW](https://lotw.arrl.org), [eQSL](https://www.eqsl.cc), [QRZ.com Logbook](https://www.qrz.com/logbook)

## Nasıl çalışır?

FT8, **8-tone Frequency-Shift Keying** modülasyonu kullanır. Bilgi ses sinyalindeki 8 farklı tonun ardışık değişimleriyle aktarılır. Telsizinizin SSB modunda (tipik USB) verici çalışır; bilgisayarın ses kartı tonları üretir.

### Zamanlama

FT8 **15 saniyelik döngülerde** çalışır. Her dakika 4 slot var:

-   **0:00 — 0:15** TX (yayın)
-   **0:15 — 0:30** RX (dinleme)
-   **0:30 — 0:45** TX
-   **0:45 — 1:00** RX

İki istasyon iç içe geçer (sen TX iken karşı RX, sen RX iken karşı TX).

```
Slot 0 (0-15s)   ─►  CQ TA1ABC KN51         (TA1ABC çağrı yapıyor)
Slot 1 (15-30s)  ◄─  TA1ABC W2XYZ FN20      (W2XYZ cevap veriyor)
Slot 2 (30-45s)  ─►  W2XYZ TA1ABC -12       (TA1ABC sinyal raporu gönderiyor: −12 dB)
Slot 3 (45-60s)  ◄─  TA1ABC W2XYZ R-08      (W2XYZ rapor + onay: −8 dB)
Slot 4 (0-15s)   ─►  W2XYZ TA1ABC RR73      (TA1ABC son onay)
Slot 5 (15-30s)  ◄─  TA1ABC W2XYZ 73        (W2XYZ veda)
```

Toplam **~90 saniye = tam bir QSO**. KN51 ve FN20 grid square'ler (Maidenhead konum kodu).

### Mesaj formatı

FT8 paketi **77 bit** kullanır — sadece çağrı işaretleri + grid + sinyal raporu (RST yok, gereksiz). Yazılım sözcükleri otomatik şifreler/çözer.

### Kritik: zaman senkronizasyonu

İki istasyonun saati **1 saniyeden az hata** ile senkronize olmalı. Aksi takdirde:

-   Slot kayar, dekod fail
-   "DT" (Delta Time) > 1.5s ise yayını alamazsınız

**Çözüm:** Bilgisayar saatinizi NTP ile sürekli güncel tutun:

-   **Windows:** Dimension 4 veya NetTime küçük yazılımı (Windows'un kendi NTP'si yetersiz)
-   **macOS / Linux:** built-in NTP yeter (`timedatectl` doğrula)
-   **Android (mobil):** Otomatik tarih + saat açık olmalı; Doğru zaman için NTP Tools

## Donanım gereksinimleri

### Minimum setup

| Bileşen | Detay |
| --- | --- |
| **HF telsiz** | SSB modlu, USB (Upper Side Band) destekli — FT-450, IC-718, Yaesu FT-857, IC-7300 (modern, USB-only) |
| **Anten** | HF dipole, vertical, EFHW (End-Fed Half-Wave) — 20m bandı (14 MHz) için tipik |
| **Bilgisayar** | Windows / macOS / Linux — düşük performanslı bile yeter (Raspberry Pi çalışır) |
| **WSJT-X yazılımı** | [wsjt.sourceforge.io](https://wsjt.sourceforge.io) — ücretsiz, K1JT'den |
| **Ses kartı arayüzü** | Modern telsizlerde dahili USB; eski modellerde **Digirig**, **Signalink USB**, **MicroHam DigiKeyer** ($50-300) |

### Tam setup (modern)

Icom IC-7300 / Yaesu FTDX-10 / FT-991A gibi cihazlar:

-   Tek USB kablosu → bilgisayar
-   USB içinde hem ses kartı (CODEC) hem CAT (telsiz kontrol) — frekans değişimi yazılımdan otomatik
-   WSJT-X "Settings → Radio" sekmesinden CAT seçin

### Eski / klasik telsizle setup

```
[ FT-857 ]──MIC kablo──[ Digirig ]──USB──[ Bilgisayar (WSJT-X) ]
   │                       │
   └──ACC kablo (CAT)──────┘
```

Digirig (~$80) modern minimal arayüz; Signalink (~$150) ses-only; CAT için ayrı serial kablo gerekir.

### Anten önerisi (apartman amatörü için)

-   **EFHW (End-Fed Half-Wave) 40m**: 20m, 15m, 10m'de ek anten gerekmeden çalışır. ~20m tel + 49:1 unun.
-   **Magnetic loop**: balkonda küçük (1-1.5m çap) çelik halka + 365 pF değişken kondansatör. Düşük verim ama yer az olduğunda mucize.
-   **HF vertical**: HyEndFed 80-10, Cushcraft R8, kendi yapımın — gerekli düşey 5-10 m.

## WSJT-X kurulumu

### Adım 1: İndir + kur

[wsjt.sourceforge.io](https://wsjt.sourceforge.io/wsjtx.html) → işletim sisteminize uygun installer. ~50 MB.

### Adım 2: İlk açılış konfigürasyonu

WSJT-X'i ilk açıştığında **Settings** otomatik çıkar:

**General sekmesi:**

-   My Call: `TA1ABC` (sizin)
-   My Grid: `KN51` (Maidenhead grid kodunuz; [grid map](https://www.levinecentral.com/ham/grid_square.php))
-   Region: 1 (Türkiye Region 1)

**Radio sekmesi:**

-   Rig: telsiz modeliniz (örn. "Icom IC-7300")
-   Serial Port: COMx veya /dev/cu.usbmodem...
-   PTT method: CAT (modern) veya RTS (eski)
-   Mode: USB (Upper Side Band — FT8 her zaman USB)

**Audio sekmesi:**

-   Soundcard input: `USB Audio CODEC` (telsizden gelen ses)
-   Soundcard output: `USB Audio CODEC` (telsize giden ses)

### Adım 3: Test bağlantı

Settings → Test CAT → ekranda telsizin frekansı görünmeli; Test PTT → telsiz TX'e geçmeli (ama power 0'da test et!).

## İlk QSO için adım adım

### 1\. Frekans seç

Standart FT8 dial frekansları (USB modunda):

| Bant | Dial freq | Kullanım |
| --- | --- | --- |
| 80m | 3.573 MHz | Akşam, yerel/Avrupa |
| 40m | 7.074 MHz | 24 saat, Avrupa-Asya |
| 30m | 10.136 MHz | Düşük güç, gece |
| **20m** | **14.074 MHz** | **En aktif, gündüz dünya geneli** |
| 17m | 18.100 MHz | Gündüz uzun-mesafe |
| 15m | 21.074 MHz | Gündüz, güneş döngüsü iyiyse |
| 10m | 28.074 MHz | Gündüz, güneş yüksekken DX |
| 6m | 50.313 MHz | Sporadic E sezonunda Avrupa |

**Yeni başlayan için: 20m (14.074 MHz)** — gündüz her zaman aktif, sinyaller bol.

### 2\. Telsizi ayarla

-   Mode: **USB** (yanlış mod = ses tersine, dekod fail)
-   Bandwidth: 2.4 kHz (standart SSB)
-   AGC: Slow
-   Compressor: OFF (sıkıştırma FT8'i bozar)
-   TX power: **5-25W** ile başla (yazılımdan veya telsizden)

### 3\. WSJT-X'te dinle

-   "Wide Graph" penceresinde dikey çubuklar = aktif sinyaller
-   Sol panel "Decode" alanında çözülen QSO'lar:
    
    ```
    171500  -12  0.4 1242 ~  CQ DL3ABC JN58
    171500  -08  0.2  745 ~  W1XYZ K9DEF EM37
    ```
    
    -   `−12` = sinyal/gürültü dB (negatif = gürültünün altında)
    -   `1242` = audio frekansı (yan kanal)
    -   `CQ DL3ABC JN58` = Almanya'dan CQ çağrısı

### 4\. CQ yap (çağrı yayınla)

-   "Tx 1" alanına: `CQ TA1ABC KN51` (otomatik dolar)
-   **"Enable Tx"** tıkla → bir sonraki ÇIFT slotta yayınla başlar
-   Yazılım QSO'yu **otomatik yönetir** (cevap gelince Tx 2-6 sırasıyla yanıtlar)

### 5\. CQ'ya cevap ver

Decode listesinde bir CQ gör:

-   **Çift tıkla** → yazılım otomatik "Tx 1" tepkisiyle başlar
-   **Watchdog** sayacını kontrol et (timeout)

### 6\. Onayla, log'la

QSO bittikten sonra (otomatik 73 değişimi) WSJT-X **log dialogu** açar:

-   Notları gözden geçir
-   "OK" → ADIF dosyasına kaydeder
-   LoTW/eQSL'e otomatik upload (Settings → Reporting'te aktif)

## Pratik ipuçları

| Sorun | Çözüm |
| --- | --- |
| "Hiç sinyal yok" | Frekans yanlış (mode USB değil), AGC kapalı, anten bağlı değil |
| "Sinyal var, dekod yok" | Saat senkronu kötü (NetTime kur); audio level çok yüksek/düşük |
| "TX'te telsiz hata veriyor" | ALC çubuğu kırmızıda — TX gain'i düşür. ALC sıfır olmalı |
| "Karşı tarafa cevap geliyor ama benden duymuyor" | TX power yetersiz; daha yüksek bant ya da daha iyi anten |
| "Sürekli aynı kişiyle QSO yapıyorum" | Hold Tx Freq açık — frekansı manuel kaydır |

### TX power dengesi

FT8'in en kritik kuralı: **gerekenden fazla güç kullanmayın.** −10 dB raporu = harika. Daha yüksek güç başkalarının QSO'larını engeller. **5-25 W tipik**; 100W FT8 etiketsizliktir.

## İleri özellikler

### FT4 (FT8'in hızlısı)

-   7.5 saniye slot (FT8'in yarısı)
-   Daha az hassas (~−18 dB) ama daha hızlı QSO
-   Frekanslar: 7.0475, 14.080, 21.140 MHz

### JS8Call

-   FT8 mod'unu konuşmaya benzer (mesaj göndermek mümkün)
-   Acil durum için ideal (e-mail, kısa metin)
-   Ayrı yazılım: [js8call.com](http://js8call.com)

### Q65

-   WSJT-X'in EME (Earth-Moon-Earth, ay yansıması) için sürümü
-   Çok zayıf sinyaller, dakikalarca slot
-   Ay kullanarak **dünyanın diğer ucuyla** kontak kuruyorsunuz!

### MSK144 (Meteor Scatter)

-   Meteor parlamalarına yansıttığınız sinyalle anlık kontak
-   144 MHz VHF DX, perseid yağmuru sezonunda Aug

## Yararlı kaynaklar

-   [WSJT-X resmi](https://wsjt.sourceforge.io)
-   [PSKReporter](https://pskreporter.info) — global FT8 sinyal haritası
-   [FT8 Operating Guide (Hinson)](https://www.g4ifb.com/FT8_Hinson_tips_for_HF_DXers.pdf) — PDF, ücretsiz
-   [DARD81 FT8 Türkçe rehber](https://dard81.org.tr/amator-telsizciligin-dijital-devrimi-ft8-nedir-ve-nasil-baslanir/)
-   [TRAC Nevşehir HF modülasyon türleri](https://www.tracnevsehir.org.tr/hf-ssb-lsb-usb-am-fm-cw-ve-ft8-nedir/)
-   [LoTW (ARRL)](https://lotw.arrl.org) — DX onayları
-   [QRZ.com](https://www.qrz.com) — kontakların callsign araması

## Sıradaki adımlar

-   [Çağrı İşareti Nasıl Alınır](/tutorials/cagri-isareti-nasil-alinir) — HF için A/B sınıfı gerekli (TA prefiks)
-   [APRS Nedir](/tutorials/aprs-nedir-nasil-kullanilir) — VHF dijital alternatif
-   [J-Pole / Slim Jim](/tutorials/anten-yapimi-temel) — başlangıç antenler (VHF; HF için ayrı dipole)

İlk DX'iniz için **bol şans, 73!**
