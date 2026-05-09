---
title: Spektrum Analizör ve Amatör Ölçüm Cihazları — Pratik Rehber
description: >-
  Amatör radyo ölçüm cihazları — spektrum analizör (Tinysa, Rigol DSA),
  oscilloscope (Rigol, Hantek), RF wattmeter (Bird), dummy load. Hangi cihaz ne
  işe yarar?
keywords:
  - spectrum analyzer
  - oscilloscope
  - ölçüm
  - Tinysa
  - Rigol
  - theory
article_section: spectrum analyzer
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Spectrum analyzer şart mı?
    a: >-
      Hayır — başlangıç için NanoVNA + wattmeter yeter. Ama DIY yapacaksan veya
      RFI debug edeceksen alır.
  - q: Tinysa Ultra vs Rigol DSA-815?
    a: >-
      - Tinysa Ultra ($120): amatör %95 ihtiyaç karşılar - Rigol DSA-815
      ($1500): lab kalitesi, hassasiyet 10x Hobby için Tinysa, profesyonel için
      Rigol.
  - q: Osiloskop bant genişliği ne olmalı?
    a: >-
      - Audio + low HF: 50 MHz yeter - HF: 100 MHz iyi - VHF: 200+ MHz - UHF:
      500+ MHz pahalı Çoğu amatör için 100 MHz sweet spot.
  - q: Bird 43 elementleri pahalı mı?
    a: >-
      Tek element ~$80-150 (5W/100W/1500W). Satın alırken 2-3 element ortak
      takım — değer.
  - q: NanoVNA vs spectrum analyzer fark?
    a: >-
      - NanoVNA: 50Ω port karakterizasyonu (anten / filter / cable) - SA: 50Ω
      port'ta sinyal seviyesi gözlemi İki farklı amaç — ikisi de gerek. ---
---
[NanoVNA tutorialımız](/tutorials/nanovna-anten-olcumu) anten ölçümü işliyor. Bu rehber daha geniş — **spektrum analizör**, **oscilloscope**, **wattmeter**, **dummy load**. Amatör operatör için "neye sahip olmalı + nasıl kullanmalı" rehberi.

## Ölçüm cihazları amatör için neden önemli?

### Pratik faydaları

-   **Vericinin temizliği** — harmonics, spurious emisyonu kontrol
-   **Anten karakterizasyonu** — SWR, empedans, pattern
-   **RFI tespit** — gürültü kaynak bulma
-   **DIY proje test** — kendi yaptığın amp / filter / oscillator

### Kim ölçüm yapar?

-   DIY amatör (homebrew operatör)
-   Contest operatör (verici saflığı denetim)
-   EmComm operatör (cihaz hazır mı kontrol)
-   Eğitimci (örnekleme, deney)

## Spektrum Analizör (SA)

Frekans domain ölçümü — sinyalin hangi frekanslarda ne kadar gücü olduğu.

### Ne için?

-   Vericinizin **harmonik emisyonu** (2x, 3x freq)
-   **Spurious** (istenmeyen frekanslarda emission)
-   RFI **kaynağı tespit** (broadband noise yayını)
-   Filter testi (low-pass cutoff doğru mu)
-   Anten **rezonans frekansı** (NanoVNA da yapar ama SA daha hassas)

### Tipler

#### Entry: Tinysa Ultra ($120)

-   100 kHz - 6 GHz
-   Built-in input attenuator
-   Touch screen
-   Tracking generator (sweep test)
-   USB charging
-   **Amatör için altın oran** — ucuz + yetenekli

#### Mid-range: Rigol DSA-815 ($1500)

-   9 kHz - 1.5 GHz
-   Tracking generator
-   Resolution bandwidth 1 Hz - 1 MHz
-   Network analyzer modu eklenebilir

#### Premium: Rohde & Schwarz / Keysight

-   $10K+
-   Lab grade
-   Çoğu amatör için aşırı

### Pratik kullanım: harmonic emission test

1.  Telsiz dummy load'a bağla (anten yerine)
2.  Spektrum analizör coupling probe ile dummy load'dan örnekle
3.  TX yapadı 14.250 MHz USB
4.  SA ekran:
    -   **Fundamental** 14.250 (5W tipik)
    -   **2nd harmonic** 28.500 (-50 dB veya altı, normal)
    -   **3rd harmonic** 42.750 (-60 dB, normal)
5.  Eğer 2nd harmonic -30 dB civarı = TX yetersiz filtreli, sorun

Türkiye yönetmeliği: harmonic emission ≤ -40 dBc (40 dB carrier altı).

### Pratik 2: RFI gürültü kaynak bulma

1.  Tinysa Ultra çalıştır, 0-30 MHz sweep
2.  Eve girip evdeki cihazlara yaklaş
3.  **LED ampul yakın → 5-30 MHz peak yayın**
4.  Kaynağı tespit, çözüm uygula

## Oscilloscope (Osiloskop)

Time domain ölçümü — sinyalin zamana göre değişimi.

### Ne için?

-   Audio signal kalitesi (SSB modulator output)
-   Dijital signal analiz (PSK31, FT8 tone)
-   Devre debug (kit yapımı)
-   Power supply ripple
-   TX envelope (CW sinyali shape, click önleme)

### Tipler

#### Entry: Hantek DSO5072P ($300)

-   70 MHz, 2-channel
-   1 GSa/s sample rate
-   Touch screen
-   USB connectivity

#### Mid-range: Rigol DS1054Z ($350)

-   50 MHz (firmware 100 MHz hack edilebilir)
-   4-channel
-   1 GSa/s
-   En popüler amatör osiloskop

#### Premium: Tektronix MDO3000 ($3000+)

-   100 MHz - 1 GHz
-   Spectrum + osiloskop kombinasyon

### Amatör için ideal

**Rigol DS1054Z** — 70 MHz amatör HF için yeter, 4 kanal, ucuz, "100 MHz hack" community lisansı yapıyor.

### Pratik 1: SSB envelope test

-   Mike audio signal → SSB transceiver
-   Anten yerine dummy load
-   Osiloskop probe dummy load'da AC pickup
-   Envelope **clean** olmalı, distortion (overmodulation) görünür mü?

### Pratik 2: CW key click

-   CW transmitter çıkışında envelope shape
-   Sharp on/off → click (komşu freq'lere yayılma)
-   Gradual ramp → temiz, click-free

## SWR metre vs Anten analizörü — kritik fark

Bu iki cihaz aynı şeyi yapar sanılır ama rolleri tamamen farklı:

### SWR metre = "hararet göstergesi"

Telsiz ile anten arasına seri bağlanan **pasif izleme** aracı. Yayın sırasında anlık giden/dönen güç oranını gösterir. Aracın hararet göstergesi gibi — **sürekli izler**, sorun anında uyarır (anten devrilmiş, kabloya su girmiş, konnektör gevşemiş). Ama sorunun **ne olduğunu** söylemez — sadece "bir şey var" der.

**Kritik uyarı:** SWR metre ile ölçüm yapmak için telsizden RF çıkışı gerekir. Ayarsız bir sistemde (SWR 5+) bu test telsizin **final transistörlerini tehlikeye atar** — cihaz koruma moduna geçmezse yanar.

### Anten analizörü / NanoVNA = "laboratuvar"

Telsizden **bağımsız** çalışan aktif cihaz. Kendi düşük güçlü sinyal üreteci var — finalleri tehlikeye atmaz. Sadece "sorun var mı?" değil, **"sorun nerede ve neden?"** sorusuna da cevap verir: frekans grafiği, empedans, Smith Chart.

**Pratik:** Yeni anten kurduğunda önce **analizör** ile kontrol et (SWR sweep, empedans, rezonans frekansı). Sorunsuzsa telsizle bağla. Günlük operasyonda **SWR metre** ile izle.

## RF Wattmeter

Verici çıkış gücünü ölçer.

### Bird 43 (klasik, $400-800)

-   1.8 MHz - 1 GHz
-   Plug-in elements (5W / 100W / 1500W)
-   Analog needle
-   Gold standard 50 yıldır

### Modern dijital

-   **Daiwa CN-101L** (~$200) — 1.8-200 MHz, 5W/20W/200W ranges
-   **MFJ-988** ($150) — basit, dual needle (forward + reflected = SWR)
-   **Telepost LP-100A** ($600) — premium, USB connectivity

### Kullanım

-   Telsiz manual'da "100W output" der
-   Wattmeter test et — 88W mu, 105W mı?
-   Anten yansıyan güç (reflected) ile SWR hesabı

### Bird 43 vs digital

-   **Bird 43**: 50 yıl ömür, ikinci el bulunur, calibration drift yok
-   **Digital**: ucuz, ama 5-10 yılda LCD/electronics arıza

Pratik amatör için: **Daiwa CN-101L** orta yol.

## Dummy Load

50Ω resistive load — antenne yerine kullanılır, RF güç ısıya dönüştürür. Test için kritik.

### Ne için?

-   TX testi anten gerek yok
-   Spectrum analyzer ölçüm
-   "Yağlı dummy load" (oil cooled) yüksek güç

### Tipler

#### MFJ-260C ($60)

-   300W (15 sn maks)
-   1.8-650 MHz

#### Heathkit Cantenna (vintage)

-   1 kW, oil cooled
-   Yağ içinde resistor
-   Klasik tüplü amplifier test

#### Diamond DL-30A ($80)

-   30W continuous
-   VHF/UHF

### Önemli: güç + duty cycle

-   100W TX 30 saniye = MFJ-260C OK
-   100W FT8 (30 dakika) = aşırı, **fan ekle** veya yağ dummy
-   1500W test = 1 kW yağ dummy zorunlu

## NanoVNA — vector network analyzer

[Detaylı tutorial →](/tutorials/nanovna-anten-olcumu)

### Ne için?

-   Anten SWR + empedans
-   Smith Chart matching
-   Cable test (TDR)
-   Filter karakterizasyonu

### Tipler

-   **NanoVNA-H** (~$50) — entry
-   **NanoVNA-F V2** (~$130) — premium amatör
-   **LiteVNA** (~$80) — modern alternative

## Function Generator

Sinyal üreteci — kalibrasyon, test için.

### Ucuz: Hantek 1025G ($150)

-   25 MHz
-   1 channel
-   Sinüs, kare, üçgen, ramp dalga

### Pratik kullanım

-   Telsiz audio chain test
-   Filter response test (function generator + oscilloscope)
-   Digital mod simülasyon (PSK tone üret)

## RF Power Meter (precision)

Wattmeter'dan farklı — hassas RF güç ölçümü:

-   **Boonton 4220** — RF lab gold standard
-   Amatör için aşırı, profesyonel only

## Frequency Counter

Tam frekans ölçümü:

-   **BG7TBL FA-2** ($60) — 2.4 GHz
-   **Rigol DSA series'in dahili counter**

### Pratik

-   Telsiz frequency calibration (drift varsa düzelt)
-   Quartz crystal'lerin gerçek frequency
-   VFO test

## Anten Analyzer

NanoVNA'nın eski kuzeni:

-   **MFJ-269** ($350) — 1-200 MHz, manuel sweep
-   **MFJ-259B** ($300) — daha basit
-   **RigExpert AA-230** ($400) — modern, premium

NanoVNA daha yetenekli + ucuz, ama bazı operatörler **manual analog** dial sevenler için.

## Bütçe set önerileri

### Entry: $200 set

-   Tinysa Ultra ($120) — spectrum analyzer
-   NanoVNA-H ($50) — anten analyzer
-   Daiwa CN-101L ($200 sniper deal) — wattmeter

Bu setle %80 amatör ölçüm ihtiyacı karşılanır.

### Mid: $1000 set

-   Rigol DSA-815 ($1500 negotiated) — premium SA
-   Rigol DS1054Z ($350) — osiloskop
-   Bird 43 + 5W/100W elements ($600)
-   MFJ-260C dummy load ($60)

### Pro: $3000+ set

-   Tektronix MDO3000 ($3000)
-   Rohde & Schwarz lab quality
-   Yağ dummy load 1 kW
-   Calibration standartları

## Kalibrasyon

Cihaz **doğru ölçüyor mu?** Kalibrasyon gerek:

-   **Trace metrology** — test cihazını başka cihazla karşılaştır
-   **Self-calibration** — modern cihazlarda dahili
-   **Lab calibration** — periyodik (yıllık) profesyonel kalibrasyon servis

Amatör için ev kalibrasyonu yeter — known good source (örn 100 MHz reference oscillator) ile ölçüm.

## Pratik problem: kit yapımı debug

3 watt CW transmitter kit yaptın, çalışmıyor:

### Adım adım

1.  **Power supply test** (oscilloscope DC) — 12V stabil mi, ripple yok mu?
2.  **Oscillator** (function generator dahili) — 14 MHz görüyor mu?
3.  **Driver stage** (oscilloscope) — sinyal güçleniyor mu?
4.  **PA stage** (oscilloscope, dummy load) — output 3W mu?
5.  **Spectrum analyzer** — emisyon temiz mi (harmonics minimum)?
6.  **Wattmeter** — output 50Ω'a 3W mu?

5-6 cihazla 1-2 saatte sorun bulunur. Cihazsız "akort akort" oynaya 10 saat.

## Sık yapılan hatalar

### 1\. Probe doğru kalibre değil

Oscilloscope probe x10 mode'da olmalı bazı ölçümlerde — yanlış mode = yanlış değer.

### 2\. SA input attenuator yeterli değil

Tinysa Ultra giriş **maksimum +10 dBm**. 100W vericisini direkt bağlama → cihaz öldü. **Coupler** veya **attenuator** gerek.

### 3\. Dummy load aşırı süre

30 saniye sonra ısınır, RF özelliği bozulur. Heat sink + fan veya yağ tipi tercih.

### 4\. Ground loop

Multiple test cihaz aynı outlet → ground loop → ölçüm interferans. **Single point ground**.

### 5\. Coax kötü

Kalitesiz USA-China coax = ölçüm gürültü. Kaliteli RG-58/213 + iyi konnektör.

## Sık sorulan sorular

### "Spectrum analyzer şart mı?"

Hayır — başlangıç için NanoVNA + wattmeter yeter. Ama DIY yapacaksan veya RFI debug edeceksen alır.

### Tinysa Ultra vs Rigol DSA-815?

-   **Tinysa Ultra** ($120): amatör %95 ihtiyaç karşılar
-   **Rigol DSA-815** ($1500): lab kalitesi, hassasiyet 10x

Hobby için Tinysa, profesyonel için Rigol.

### Osiloskop bant genişliği ne olmalı?

-   Audio + low HF: 50 MHz yeter
-   HF: 100 MHz iyi
-   VHF: 200+ MHz
-   UHF: 500+ MHz pahalı

Çoğu amatör için **100 MHz** sweet spot.

### Bird 43 elementleri pahalı mı?

Tek element ~$80-150 (5W/100W/1500W). Satın alırken **2-3 element** ortak takım — değer.

### NanoVNA vs spectrum analyzer fark?

-   **NanoVNA**: 50Ω port karakterizasyonu (anten / filter / cable)
-   **SA**: 50Ω port'ta sinyal seviyesi gözlemi

İki farklı amaç — ikisi de gerek.

* * *

## İlgili kaynaklar

-   [NanoVNA ile anten ölçümü](/tutorials/nanovna-anten-olcumu) — pratik VNA
-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [RF gürültü tipleri](/tutorials/rf-gurultu-tipleri-bastirma)
-   [SDR yazılım tabanlı telsiz](/tutorials/sdr-yazilim-tabanli-telsiz)
-   [RF amplifier sınıfları](/tutorials/rf-amplifier-siniflari)
-   Tinysa: [tinysa.org](https://www.tinysa.org/wiki/)
-   Rigol: [rigolna.com](https://www.rigolna.com/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — ölçüm makaleleri
