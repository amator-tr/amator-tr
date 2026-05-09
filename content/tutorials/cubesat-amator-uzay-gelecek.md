---
title: CubeSat ve Amatör Uzay Haberleşmesi — Gelecek Ham Radio
description: >-
  CubeSat amatör uyduları, AMSAT-DL Phase 4B (geosynkron), Mars Cube One,
  üniversite kulüpleri uzaya gönderme. Yapay zeka + uzay + amatör radyo
  geleceği.
keywords:
  - CubeSat
  - AMSAT
  - uzay
  - gelecek
  - satellite
  - AI
article_section: CubeSat
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: CubeSat fırlatma kaç para?
    a: >-
      Minimum $50K (1U piggyback ride). Average $150-300K. Avrupa Vega rocket
      Türk öğrenci proje destekleyebilir.
  - q: Lisans şart mı CubeSat operasyonuna?
    a: >-
      Operatöre evet (B sınıfı yeter). Ekipler için takım çağrı işareti veya
      ekip üye lisansları.
  - q: AI ham radio'yu öldürür mü?
    a: >-
      Pek olası değil. AI araç olarak ham radio'yu güçlendiriyor — daha iyi
      sinyal decode, daha akıllı log, daha hassas propagasyon. İnsan-insan
      bağlantısı (kontak felsefesi) AI ile değişmez.
  - q: Mars'tan amatör radyo kontağı?
    a: >-
      - Mars Cube One (MarCO) 2018 NASA — amateur band değil - Gelecek 10-20
      yılda bilinmiyor, ama teknik mümkün - Mars'a 4-22 dakika gecikme — gerçek
      zamanlı QSO zor, store-and-forward mümkün
  - q: En heyecan verici gelecek trend?
    a: >-
      Bana göre AI-assisted weak signal — 5W ile bütün dünya, AI decode'la
      imkansızı yapma. Cycle 26 minimum (2030) bile DX patlaması olabilir. ---
---
20 yıl önce uzay = NASA / ESA tekel. Bugün **bir Türk üniversitesi 100K USD'ye CubeSat fırlatabilir** — ve içinde **amatör radyo payload**'i. AMSAT-DL geosynkron amator transponder Phase 4B planlıyor — sürekli her yere DX. Bu rehber CubeSat dünyası + amatör uzay haberleşmenin geleceği.

## CubeSat nedir?

**CubeSat** = standart küçük uydu, 10×10×10 cm modüler ünite. 1U, 2U, 3U, 6U, 12U boyutları.

### Tarih

-   **1999**: Stanford + Cal Poly geliştirir
-   **2003**: ilk CubeSat fırlatması (XI-IV, AAU CubeSat)
-   **2010+**: yüzlerce yıllık fırlatma (CommSat, Planet, vs)
-   **2020+**: ucuz fırlatma (SpaceX rideshare $1M altı)

### Boyut + maliyet

| Tip | Hacim | Kütle | Fırlatma maliyeti |
| --- | --- | --- | --- |
| 1U | 10×10×10 cm | 1.33 kg | $50-100K |
| 3U | 10×10×30 cm | 4 kg | $150-250K |
| 6U | 10×20×30 cm | 8 kg | $300-500K |
| 12U | 20×20×30 cm | 16 kg | $700K+ |

### Akademik + ham radio

Üniversite ham radio kulüpleri:

-   Stanford QuakeSat (deprem tespit)
-   AAUSat (Aalborg Üniversitesi, Danimarka)
-   ITUpSat (İstanbul Teknik Üniversitesi 2009 — Türkiye ilk!)
-   METU CubeSat (planlama aşamasında)

## AMSAT (AMateur SATellites) organizasyonu

1969'dan beri amatör radyo uydularını organize eden non-profit.

### AMSAT-NA (US)

-   **Fox-1 series** (2015-2020): AO-91, AO-92, AO-93
-   **CubeSatSim** education kit
-   50+ yıllık tarih

### AMSAT-DL (Almanya)

-   **AMSAT-OSCAR-40** (2002, başarısız) — geosynkron amatör amaçlanmıştı
-   **Es'hailSat-2 / QO-100** (2018) — AMSAT-DL transponder kabul edildi → ilk amatör geosynkron!
-   **Phase 4B** planlama — NASA Lunar Gateway'da amatör radyo ekipmanı

### AMSAT-UK, AMSAT-LU, AMSAT-RU, vs

Her bölgede yerel AMSAT şubesi.

## Aktif amatör uydular (2026)

### LEO transponderlar

| Uydu | Tip | Mod | Aktivite |
| --- | --- | --- | --- |
| **AO-91 Fox-1B** | LEO | FM transponder | Düzenli pas |
| **AO-92 Fox-1D** | LEO | FM transponder | Intermittent |
| **SO-50** | LEO | FM transponder | Aktif |
| **RS-44** | LEO | Linear transponder | SSB/CW |
| **AO-7** | LEO | Linear (1974!) | Intermittent — yaşlı |
| **JE9PEL FunCube** | LEO | Telemetry beacon | Eğitim |

### Geosynkron

| Uydu | Tip | Mod | Coverage |
| --- | --- | --- | --- |
| **QO-100 (Es'hailSat-2)** | GEO | NB + WB linear | EU + ME + AF + IN |
| **(planlanan) Phase 4B** | GEO | Future | TBD |

### ISS (Uluslararası Uzay İstasyonu)

-   145.825 MHz APRS digi (sürekli)
-   ARISS özel SSTV etkinlikleri (yıllık)
-   ARISS school contact (öğrenciler astronotlarla SSTV)

[Satellite haberleşme tutorial →](/tutorials/satellite-haberlesme-leo-amsat) detay.

## CubeSat'da amatör radyo payload

### Standart bileşenler

-   **Beacon transmitter** — 145 MHz veya 437 MHz
-   **CW telemetry** — basit telemetry mors kodu ile
-   **AX.25 packet** — modern dijital
-   **Helical antenna** — kompakt, dairesel polarize
-   **Solar panel + battery** — güç

### Mission örnekleri

-   **GPS lokalizasyonu** — uydu pozisyonu APRS gibi yayın
-   **Sensor data** — sıcaklık, manyetik alan, plazma yoğunluğu
-   **Earth imaging** — küçük kamera, görüntü AX.25 ile beacon
-   **Scientific** — UV / X-ray detector amateur radyo aracılığıyla downlink

## Üniversite + amatör + uzay = altın üçgen

### Türkiye projesi: ITUpSat-1 (2009)

-   İstanbul Teknik Üniversitesi
-   1U CubeSat
-   437.325 MHz amatör radyo beacon
-   Türkiye'nin ilk uydu ve ilk CubeSat
-   2009 fırlatma, 2 yıl çalıştı

### Diğer Türk akademisyen plan

-   **METU CubeSat** (Orta Doğu Teknik Üniversitesi) — 2026 hedef
-   **Boğaziçi University** — feasibility
-   **Bilkent** — payload araştırma

### Üniversite kulübü kaynakları

-   AMSAT eğitim materyalleri ücretsiz
-   TARC (Turkish Amateur Radio Club) üniversite outreach
-   ESA ESERO Türkiye CubeSat eğitim programı

## QO-100 — geosynkron mucize

[Satellite tutorial](/tutorials/satellite-haberlesme-leo-amsat) ile değindik. Bu rehberde **geleceği** açısından QO-100:

### Şu anda

-   26°E geosynkron
-   NB transponder (250 kHz, SSB/CW)
-   WB transponder (8 MHz, DATV/dijital)
-   Türkiye'ye **sabit görünür** — sürekli erişim

### Phase 4B planı

-   2030+ planlanan ikinci amateur geosynkron
-   Amerika kıtası kapsama
-   AMSAT-NA + AMSAT-DL ortak

### Türkiye için

-   Apartmanda HF zor olanlar QO-100 ile DX
-   30K TL setup ile 24/7 dünya kontağı
-   Uplink 2.4 GHz + downlink 10 GHz — dish antenne gerek

## Geleceğin trendleri

### 1\. AI + amatör radyo

-   **AI signal decode**: çok zayıf sinyalleri eski algoritmalardan iyi decode
-   **Auto QSO logging** — speech-to-text + ML kontak parser
-   **Propagasyon tahmin** — ML modelleri SFI + K-index'ten DX hedef
-   ChatGPT-tarzı chatbots ham radio Q&A

### 2\. CubeSat patlaması

-   2030: 50.000+ CubeSat yörüngede tahmini
-   Amateur içerikli CubeSat sayısı 100+
-   LEO daha kalabalık, RFI sorunu

### 3\. Mars + Ay haberleşmesi

-   NASA Lunar Gateway'da amatör radyo planlama
-   ISS'den Lunar Gateway'a iletişim
-   2030: amatör CubeSat Mars yörüngesinde?

### 4\. Mesh networks

-   HamNet (Almanya) → ham mesh internet
-   AREDN (US) → mesh routers ham bantlarda
-   Türkiye'de ilk mesh deneyleri

### 5\. SDR + dijital

-   SDR transceiver fiyatları düşüyor — ham radio "yazılım define"
-   Yeni modlar haftalık çıkıyor (FT8 → FT4 → JS8 → ...)
-   Open source firmware (OpenGD77 vs)

### 6\. Genç jenerasyon

-   ESA + NASA STEM programları öğrenci amatör lisans
-   Maker culture + CubeSat = yeniden çocuk ilgisi
-   Kadın operatör artışı

## Kendi CubeSat'ını fırlatmak

### Adım adım

1.  **Üniversite / kulüp** kuruluş — ekip min 5-10 kişi
2.  **Mission tanımı** — ne ölçeceksin, ne gönderessin?
3.  **Tasarım** — KiCad PCB, mekanik CAD
4.  **Bütçe** — minimum $200-500K
5.  **Fırlatma broker** — SpaceX rideshare, Rocket Lab, Indian PSLV
6.  **Frekans koordinasyonu** — IARU, ITU lisansları
7.  **Test & integration** — vibration, vacuum, thermal cycling
8.  **Fırlatma** — bekleme listesi 12-24 ay
9.  **Operasyon** — beacon dinleme + telemetry decode

### Frekans tahsisi

Amatör radyo bantları kullanılırsa **ITU IARU koordinasyon** gerekir:

-   145 MHz (2m amatör)
-   437 MHz (70cm amatör)
-   1296 MHz (23cm amatör)

ITU-R Rec'ler şart, 6-12 ay süreç.

### Ölüm sonrası

-   LEO orbit decay 1-25 yıl (yükseklik / atmosphere drag)
-   Sonunda atmosfere giriş, yanma
-   "Space junk" sorunu nedeniyle modern CubeSat'lar **deorbit zorunlu** (3 yıl içinde)

## Türkiye için fırsatlar

### Gelir kaynakları

-   Üniversite araştırma fonları (TÜBİTAK)
-   ESA destekli programlar
-   Özel sektör (Türksat, ROKETSAN sponsor)

### Topluluk

-   TUSAŞ Uzay Sanayii
-   ITUpSat ekibi mentor
-   AMSAT-DL Türkiye temsilciliği (yeni)

## Sık sorulan sorular

### CubeSat fırlatma kaç para?

Minimum $50K (1U piggyback ride). Average $150-300K. Avrupa Vega rocket Türk öğrenci proje destekleyebilir.

### Lisans şart mı CubeSat operasyonuna?

Operatöre evet (B sınıfı yeter). Ekipler için takım çağrı işareti veya ekip üye lisansları.

### AI ham radio'yu öldürür mü?

Pek olası değil. AI **araç olarak** ham radio'yu güçlendiriyor — daha iyi sinyal decode, daha akıllı log, daha hassas propagasyon. İnsan-insan bağlantısı (kontak felsefesi) AI ile değişmez.

### Mars'tan amatör radyo kontağı?

-   Mars Cube One (MarCO) 2018 NASA — amateur band değil
-   Gelecek 10-20 yılda bilinmiyor, ama **teknik mümkün**
-   Mars'a 4-22 dakika gecikme — gerçek zamanlı QSO zor, store-and-forward mümkün

### En heyecan verici gelecek trend?

Bana göre **AI-assisted weak signal** — 5W ile bütün dünya, AI decode'la imkansızı yapma. Cycle 26 minimum (2030) bile DX patlaması olabilir.

* * *

## İlgili kaynaklar

-   [Satellite haberleşme LEO/AMSAT](/tutorials/satellite-haberlesme-leo-amsat)
-   [APRS — ISS digi](/tutorials/aprs-nedir-nasil-kullanilir)
-   [SDR yazılım tabanlı telsiz](/tutorials/sdr-yazilim-tabanli-telsiz)
-   [Amatör telsizcilik nedir](/tutorials/amator-telsizcilik-nedir)
-   [TRAC ve Türkiye amatör tarihi](/tutorials/trac-amator-radyo-turkiye-tarihi)
-   AMSAT-NA: [amsat.org](https://www.amsat.org/)
-   AMSAT-DL: [amsat-dl.org](https://amsat-dl.org/)
-   ITUpSat-1 efsanesi: [Wikipedia](https://en.wikipedia.org/wiki/ITUpSat1)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — uzay haberleşme makaleleri
