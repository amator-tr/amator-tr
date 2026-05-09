---
title: 'RTTY (Radio TeleType) — 1920''lerin Dijital Modu, Hâlâ Yaşıyor'
description: >-
  RTTY (Radio TeleType) tarihçesi ve pratik kullanım. 45 baud, 170 Hz shift,
  Baudot kod, MMTTY/fldigi yazılımı, RTTY contest'leri, modern ham radio'da hâlâ
  aktif.
keywords:
  - RTTY
  - dijital
  - kontes
  - tarih
  - fldigi
article_section: RTTY
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: RTTY öğrenmeye değer mi?
    a: >-
      Contest'çiyseniz evet — RTTY contest fırsat. Casual operatörse hayır, FT8
      yeter.
  - q: Mekanik teleprinter hâlâ kullanılır mı?
    a: Çok az — bazı museum / vintage operatörler. Modern amatör tamamen yazılım.
  - q: En düşük güç?
    a: '- 25W tipik - 100W contest pile-up - 5W QRP RTTY zorlu (FT8 daha iyi)'
  - q: Türkiye'de aktif RTTY?
    a: >-
      14.085 MHz hafta sonu CQ WW RTTY öncesi pratik. Aktif kontak az ama
      mevcut.
  - q: FT8 yazılımı RTTY de yapar mı?
    a: WSJT-X RTTY desteklemez. fldigi veya MMTTY ayrı yazılım. ---
---
1920'lerin telgraf teknolojisi → bugün hâlâ amatör radyoda aktif. **RTTY (Radio TeleType)** = klasik dijital mod, ses tonlarıyla metin gönderme. CW + dijital arası bir yer. Bu rehber RTTY tarihçesi + modern kullanım + contest'ler.

## RTTY nedir?

**Radio TeleType** = ses tonlarıyla **klavye metni** gönderme. Mors koddan farklı, **mekanik teleprinter** ile başladı, modern bilgisayar ile devam.

### Sinyalin yapısı

-   **2 ses tonu** — Mark (1, 2125 Hz) + Space (0, 2295 Hz)
-   **170 Hz shift** — iki ton arasındaki fark
-   **45.45 baud** — saniyede 45 bit
-   **Baudot 5-bit** code (her harf 5 bit)
-   USB modu (bazen LSB, gelenek)

### Bandwidth

~270 Hz — CW (150 Hz) ile FT8 (50 Hz) arası.

## Tarihçe

### 1900'ler başı

-   **Telex** (telgraf üzerinden teleprinter) ticari telekom
-   Western Union, AP haberleri telex ile

### 1930-40'lar

-   Mekanik teleprinter Model 15, Model 19 popüler
-   Demir çekiç gibi yazıcı + kağıt rulo
-   Audio frequency shift keying (AFSK) tabanlı

### 1950-60'lar

-   Amatör radyo'ya geldi
-   "Green Keys" (ham operator slang) Model 28 teleprinter
-   Manuel SSB transceiver + audio coupling

### 1990'lar

-   Bilgisayar yazılım taklit etti — mekanik teleprinter retire
-   **MMTTY** (Mineo JE3HHT, MMSSTV ile aynı geliştirici) yazılım

### 2000+

-   Dijital alternatif (PSK31, FT8) çıktı
-   RTTY hâlâ contest'lerde aktif — gelenek + nostalji

## RTTY frekansları

USB modunda HF bantlarda:

| Bant | RTTY |
| --- | --- |
| **80m** | 3.580-3.620 MHz |
| **40m** | 7.040-7.080 MHz |
| **30m** | 10.140-10.150 MHz |
| **20m** | 14.080-14.099 MHz (en aktif!) |
| **17m** | 18.100-18.110 MHz |
| **15m** | 21.080-21.099 MHz |
| **10m** | 28.080-28.099 MHz |

**14.080 MHz USB** = RTTY dünya merkezi. Hafta sonu sürekli aktif.

## Yazılımlar

### MMTTY (Win, ücretsiz, klasik)

-   1990'lardan beri
-   En popüler RTTY yazılımı
-   HamSoft.ca → indir
-   N1MM Logger ile entegre (contest)

### fldigi (Linux/Mac/Win, ücretsiz)

-   Multi-mode: RTTY + PSK + Olivia + ...
-   Modern arayüz
-   En popüler Linux dijital mod yazılımı

### N1MM Logger

-   Contest yazılımı
-   Dahili RTTY decoder/encoder
-   MMTTY plug-in

## Kurulum

### 1\. Yazılım indir

fldigi (multi-platform) veya MMTTY (Windows).

### 2\. Telsiz bağlantı

-   USB cable veya ses kart
-   USB modunda telsizi
-   14.085 MHz tune

### 3\. Audio level

-   Telsiz speaker → bilgisayar mic
-   Bilgisayar speaker → telsiz mic
-   ALC indikatörü mid-range

### 4\. RTTY mode seç

-   fldigi: Mode → RTTY → 45 baud, 170 shift
-   MMTTY: default settings yeter

### 5\. Test

-   Boş RTTY frekans tune (14.085)
-   Birkaç dakika dinle
-   Decoder'da text görmelisin

## Pratik kontak

### CQ atma

```
CQ CQ CQ DE TB3KKD TB3KKD TB3KKD K
```

(K = "kontak almaya hazırım", CW geleneği)

### Cevap akışı

```
TB3KKD DE TA1ABC TA1ABC K
TA1ABC DE TB3KKD HI ALI UR RST 599 599
NAME KAAN QTH BURSA
HW? K
```

### Hız

30-50 saniye/kontak — FT8'den hızlı (75s) ama hızlı değil contest'in dışında.

## RTTY Contest

### CQ WW RTTY DX Contest (Eylül)

-   48 saat
-   Tüm dünya × tüm bantlar
-   Exchange: RST + CQ Zone (TR = 20)
-   En büyük RTTY contest

### ARRL RTTY Roundup (Ocak)

-   30 saat
-   Tüm bantlar (10-80m)
-   Exchange: RST + state/serial

### Türkiye'den RTTY Contest

-   TRAC contest takımları RTTY DX kategorisinde
-   50W ile rekabet edilebilir
-   100W+ tipik amatör seviyesi

### N1MM Logger + MMTTY

-   En popüler contest setup
-   Otomatik macro (function tuş = preset mesaj)
-   DX cluster spotting entegre

## RTTY karakteristik

### Avantajlar

-   **Geleneksel** — 100 yıllık teknoloji ruhsatı
-   **Multi-platform** — her yazılım decode eder
-   **Encryption yok** — açık metin
-   **Robust** — Donanım problemleri tolerans

### Dezavantajlar

-   **Yavaş** — 45 baud (FT8'in milyonda biri kadar bilgi)
-   **Gürültü hassas** — 170 Hz shift küçük interferans hassas
-   **HF only** — VHF/UHF nadir

## RTTY vs FT8 — neden hâlâ?

### Geleneksel + topluluk

-   Eski operatörler "real ham radio" sayar
-   Contest gelenekleri (yıllık 50+ yıl tarihçeli)
-   Mekanik teleprinter koleksiyonerler

### Düşük güç performansı

-   25-50W ile RTTY DX yapılır
-   FT8 daha hassas ama RTTY daha "interactive"

### Pratik

RTTY hala 5-10% dijital trafiği — niche ama yaşıyor.

## Pratik ipuçları

### Frequency shift

-   170 Hz **standart amatör**
-   850 Hz HF marine eski
-   USB modunda 170 Hz net

### Carrier issue

-   Telsiz **AFSK** modu kullanmalı (telsizin kendisi tone üretir)
-   Veya bilgisayar **tone üret** (audio coupled)
-   Yanlış mod = kontak imkansız

### Mark / Space karışmama

-   Telsiz **USB / LSB** kararlı seç
-   Yanlış SB = decode bozuk
-   Standart: USB

## Audio FSK vs Direct FSK

### AFSK (Audio FSK)

-   Bilgisayar audio tone üret
-   SSB modunda telsiz transmit
-   En yaygın amatör

### Direct FSK

-   Telsiz native FSK mode (Yaesu FT-991A vs)
-   Daha temiz signal
-   Karmaşık setup

Modern amatör için AFSK yeter.

## Sık sorulan sorular

### RTTY öğrenmeye değer mi?

Contest'çiyseniz **evet** — RTTY contest fırsat. Casual operatörse **hayır**, FT8 yeter.

### Mekanik teleprinter hâlâ kullanılır mı?

Çok az — bazı museum / vintage operatörler. Modern amatör tamamen yazılım.

### En düşük güç?

-   25W tipik
-   100W contest pile-up
-   5W QRP RTTY zorlu (FT8 daha iyi)

### Türkiye'de aktif RTTY?

14.085 MHz hafta sonu CQ WW RTTY öncesi pratik. Aktif kontak az ama mevcut.

### FT8 yazılımı RTTY de yapar mı?

WSJT-X RTTY desteklemez. **fldigi** veya **MMTTY** ayrı yazılım.

* * *

## İlgili kaynaklar

-   [FT8 dijital mod](/tutorials/ft8-dijital-mod)
-   [Contesting rehberi](/tutorials/contesting-yarisma-rehberi)
-   [Mors kodu öğrenme](/tutorials/mors-kodu-ogrenme) — alternatif klasik
-   [Packet radio + AX.25](/tutorials/packet-radio-ax25-aprs-evrim)
-   [Modülasyon AM/FM/SSB](/tutorials/modulasyon-am-fm-ssb-detay)
-   fldigi: [w1hkj.com](http://www.w1hkj.com/)
-   MMTTY: [hamsoft.ca/pages/mmtty](https://hamsoft.ca/pages/mmtty.php)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/)
