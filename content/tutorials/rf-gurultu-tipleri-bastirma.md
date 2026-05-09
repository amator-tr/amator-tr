---
title: RF Gürültü Tipleri ve Bastırma — S-meter Sürekli Yüksekse
description: >-
  Atmospherik gürültü, man-made (urban), thermal noise tipleri. RFI kaynakları
  (LED, PV solar, switching PSU), ferrit choke, common-mode filter, gürültü
  blanker (NB).
keywords:
  - RF noise
  - gürültü
  - RFI
  - filter
  - ferrit
  - theory
article_section: RF noise
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: S-meter göstergem neye göre?
    a: >-
      - S0-S9 standart - S9 = -73 dBm referans 50Ω - Her S 6 dB - "S9+20" → -53
      dBm (S9 + 20 dB)
  - q: Ne kadar gürültü kabul edilebilir?
    a: '- S3 ve altı = ideal DX - S5-S6 = orta zor - S7+ = zayıf sinyal kayıp'
  - q: Ferrit ne kadar çalışır?
    a: Mix doğru olursa 90%+ etkili. Yanlış mix → etkisiz veya saturate.
  - q: Noise blanker" ile "noise reduction" fark?
    a: >-
      NB = pulse noise (kısa burst) — atımları siler NR = continuous noise — DSP
      filter
  - q: En ucuz tek RFI çözüm?
    a: >-
      - Ferrit toroid 50 TL → koaksta CMC bastırma - 3-5 dB iyileştirme tipik -
      Yatırımı geri verir 1 ay içinde ---
---
S-meter göstergesi sürekli S5'te. Tüm zayıf sinyaller bu gürültüde kayboldu. **Sebep belki anteni değil** — şehrinizden gelen elektromanyetik kirlilik. Bu rehber RF gürültünün **kategorize edilmesi** + bastırma teknikleri.

## RF gürültü kategorileri

### 1\. Atmospheric (atmosferik)

-   **Doğal kaynak**: yıldırım, statik elektrik, kuzey ışıkları
-   Frekans: HF düşük frekansta yoğun (160m, 80m yaz akşamı), UHF'te minimum
-   Mevsim: yaz fırtına ile artar, kış az
-   **Bastırma**: imkansız (doğal), antenni iyi konumlandır

### 2\. Galactic (kozmik)

-   Galaksi merkez yayını, güneş radyasyonu
-   VHF/UHF üstünde dominant
-   144 MHz: -174 dBm/Hz (cosmic background)
-   Üzerine çıkamayız, **alt sınır** belirler

### 3\. Thermal (termal)

-   Receiver içinden, transistor / direnç ısı
-   Düşük (-174 dBm/Hz @ 290K)
-   LNA noise figure ile kontrol edilir

### 4\. Man-made (insan kaynaklı) — en sıkıntılı

-   Şehirdeki elektrik cihazları
-   LED ampuller, PV inverter, switching PSU, motor, köprü kontrolleri
-   HF + VHF'te yüksek (S5-S9 olabilir)
-   **Bastırma** mümkün — bu yazının ana konusu

## Man-made noise kaynakları

### 1\. LED ampuller

-   Düşük kalite LED driver = HF noise generator
-   1.8-30 MHz arasında broadband emisyonu
-   "Kısa mesafede LED ışığı söndür → S-meter düşer" tipik test

### 2\. PV solar inverter

-   Mikro-inverter çatısı = HF noise factory
-   30 MHz altı yoğun
-   Komşunun solar paneli senin amatör radyo'yu öldürür

### 3\. Switching power supply (SMPS)

-   Charger, laptop adapter, tablet — switching noise
-   100 kHz - 30 MHz noise harmonics
-   Non-EMC compliant ucuz Çince modeller en kötü

### 4\. Plasma / gaz tubes

-   Eski TV (CRT), plasma TV, neon tabela
-   1-100 MHz noise
-   Modern LCD TV az sorun

### 5\. PLC / Powerline networking

-   Internet over powerline cihazları
-   HF bantlarda **çok yüksek seviye** noise
-   Türkiye'de yaygın değil ama Avrupa'da major sorun

### 6\. Switching motors

-   Buzdolabı, çamaşır makinesi, klima
-   Compressor / inverter modu
-   Çok yüksek pulse noise

### 7\. Şehir altyapı

-   Trafik ışığı kontrol
-   Sokak lambaları (LED converted)
-   Tram / metro inverter
-   Elektrik şebeke kıvrımları

## Tipik gürültü seviyeleri

| Lokasyon | HF noise (S-meter) |
| --- | --- |
| **Country / dağ** | S0-S2 (çok sessiz) |
| **Küçük kasaba** | S2-S4 |
| **Şehir merkezi** | S5-S7 |
| **Apartman / balkon** | S7-S9 (komşu cihazlar) |
| **Endüstriyel bölge** | S9+30 dB (almazsın) |

## Tespit yöntemleri

### 1\. S-meter walking

-   Anteni ev içinde gez (loop antenne)
-   Hangi yön kuvvetlendiriyor?
-   Koz kötü cihaza işaret

### 2\. RFI test

-   Evin **all elektriği kapat** (sigortayı kapat)
-   S-meter'a bak — düşmüş mü?
-   Düşüyorsa kaynak ev içinde
-   Düşmüyorsa komşu / şehir

### 3\. Cihaz cihaz test

-   Sigortaları tek tek aç
-   Hangisinde S-meter zıplar
-   O hattaki cihazları tespit et (LED ampul, charger vs)

### 4\. Frequency analysis

-   Spectrum analyzer / SDR waterfall
-   Belirli frekanslarda peak — switching frequency
-   100 kHz arası harmonics → SMPS imzası

### 5\. Direction finding

-   **Loop antenne** (yön belirler)
-   Maksimum sinyalde antene yön = noise source

## Bastırma teknikleri

### 1\. Ferrit choke (en pratik)

Cihazların güç kablolarına / sinyal kablolarına ferrit clip-on:

-   **Mix-31** ferrit (HF için)
-   **Mix-43** ferrit (mid frequency)
-   5-10 sarım → choke etki
-   90% RFI emisyonu azaltır

#### Uygulama

-   Telsiz'in koaksta (CMC)
-   Komşu cihazların güç kablolarında
-   USB / network kablolarında
-   Charger'larda

#### Maliyet

-   Çince clip-on ~10-30 TL
-   3M veya Würth kalite ~50-150 TL
-   10-20 ferrit kullanımı = sahil dikkati setup

### 2\. Low-pass filter (vericiden çıkışta)

Sen TX yaparken senin cihazın komşuya RFI yapmasın diye:

-   HF için 30 MHz cutoff filter
-   Verici → filter → anten
-   Harmonic emisyon -60 dB azaltma

### 3\. Bandpass filter (alıcı girişinde)

İstemediğin frekanslardaki güçlü sinyali bastır:

-   Yakındaki broadcast tower (FM 88-108 MHz)
-   2m'de operatör, 88 MHz FM rampa giriş
-   Bandpass filter 144-148 MHz pass, gerisi reject

### 4\. Common-mode choke (current balun)

Koaksta external RF akımını bastır:

-   1:1 current balun (FT-240-43 + 8-10 sarım)
-   Anten besleme noktasında
-   Coax shield'in anten gibi davranmasını engeller

[Balun yapımı tutorial →](/tutorials/balun-yapimi-rehberi)

### 5\. Receiver noise blanker (NB)

Pulse noise (motor / ignition) için telsiz dahili:

-   IC-7300 NB level ayarı
-   Pulse'ları "atlar" — anlık sinyal kaybı ama ortalama kazanç
-   Atmospherik veya broadband noise için **etkili değil**

### 6\. DSP noise reduction (NR)

Modern SDR transceiver'larda:

-   Ses signal'ini analiz, noise + signal ayır
-   Insan sesi koruma + background noise bastırma
-   10-15 dB perceived improvement
-   Aşırı ayarlama → "tunnel sound"

### 7\. Loop antenne (gürültü reddi)

Magnetic loop antenne:

-   Manyetik dominant, elektrik alanı az
-   Şehir RFI'i çoğunlukla **elektrik alanı** dominant
-   Loop ile 6-15 dB daha sessiz reception
-   [Magnetic loop tutorial →](/tutorials/magnetic-loop-anten-yapimi)

### 8\. Toprak ve grounding

-   Single-point ground RF system
-   Ground loop'u bozma
-   Ev electrical ground'a doğru bağlantı

[RF topraklama tutorial →](/tutorials/rf-topraklama-yildirim-koruma)

## Komşu RFI çözümü (politik kısım)

Sen değil, komşu sorun. Yaklaşım:

### 1\. Saygılı tespit

Komşuya, "Solar panel switcher'i 3.5-30 MHz noise yapıyor, ham radio amaüriyim, etkilenmemize sebep oluyor"

### 2\. Önerme

Sen ferrit + filter ekle (ücretsiz hediye)

-   LED ampulü EMC-compliant marka değiştir (Philips Hue mesela)
-   Switching PSU yerine linear PSU
-   Bu öneriler komşunun cihazını da daha iyi çalıştırır (interference azalır)

### 3\. Yasal seçenek

Türkiye'de **EMC Direktifi 2014/30/EU** uyumlu. Cihaz bu uyumlu değilse BTK denetim talep edilir. **Son çare** — komşu ilişki bozar.

## Senaryo: tipik şehir apartmanı

100W telsiz + balkon vertical + 5. kat:

-   HF noise S6-S8 (komşu LED + PV + chargers)

### Strateji

1.  **Magnetic loop** alternatif (S5'e düşer)
2.  **NR + NB** açık (S4)
3.  **Ferrit choke** koaks + power kablolarda (S3)
4.  **DSP filter** ile son temizlik (effective S2)
5.  **Sadece gece** operasyon (LED'ler kapalı, S1)

Sonuç: S2-S4 — DX yapılabilir.

## Senaryo: şehir dışı sahil

10W QRP + EFHW + sahil:

-   Atmospherik noise S2 (yıldırım uzakta)
-   Man-made S1
-   Galactic floor

DX hayatımı en iyi yer. Bu yüzden POTA / SOTA aktivasyonları sahil tepelerinde tercih edilir.

## Modern SDR + AI noise reduction

2025+ trend: AI-based noise filtering:

-   ML modeller speech-noise ayır
-   20-30 dB perceived improvement
-   Eski DSP'den çok daha akıllı
-   IC-7300 firmware update'leri ekliyor

## Sık sorulan sorular

### S-meter göstergem neye göre?

-   S0-S9 standart
-   S9 = -73 dBm referans 50Ω
-   Her S 6 dB
-   "S9+20" → -53 dBm (S9 + 20 dB)

### Ne kadar gürültü kabul edilebilir?

-   S3 ve altı = ideal DX
-   S5-S6 = orta zor
-   S7+ = zayıf sinyal kayıp

### Ferrit ne kadar çalışır?

Mix doğru olursa 90%+ etkili. Yanlış mix → etkisiz veya saturate.

### "Noise blanker" ile "noise reduction" fark?

NB = pulse noise (kısa burst) — atımları siler NR = continuous noise — DSP filter

### En ucuz tek RFI çözüm?

-   Ferrit toroid 50 TL → koaksta CMC bastırma
-   3-5 dB iyileştirme tipik
-   Yatırımı geri verir 1 ay içinde

* * *

## İlgili kaynaklar

-   [Apartmanda amatör telsizcilik](/tutorials/apartmanda-amator-telsizcilik) — RFI yönetimi
-   [Magnetic loop anten yapımı](/tutorials/magnetic-loop-anten-yapimi) — düşük gürültü
-   [Balun yapımı](/tutorials/balun-yapimi-rehberi) — common-mode bastırma
-   [RF topraklama + yıldırım](/tutorials/rf-topraklama-yildirim-koruma)
-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [SDR yazılım tabanlı telsiz](/tutorials/sdr-yazilim-tabanli-telsiz) — DSP noise reduction
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — RF gürültü makaleleri
