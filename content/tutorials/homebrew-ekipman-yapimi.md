---
title: Homebrew — Kendi Telsiz Ekipmanını İnşa Etmenin Sanatı
description: >-
  Amatör radyo homebrew (kendi ekipmanını yap) kültürü. Pixie CW transmitter,
  uBITX SSB, (tr)uSDX kit, balun sarım, anten yapım, PCB tasarım, Arduino/ESP32
  entegrasyon.
keywords:
  - homebrew
  - DIY
  - kit
  - Pixie
  - uBITX
  - uSDX
  - elektronik
article_section: homebrew
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Homebrew telsiz yasal mı?
    a: >-
      Evet — lisanslı amatör kendi yaptığı cihazla TX yapabilir. Ama harmonik
      emisyon sınırlarına uymalı (LPF zorunlu).
  - q: En ucuz homebrew setup?
    a: Pixie CW kit ($5) + dipole ($5 tel) + pil ($10) = $20 ile HF kontak.
  - q: 'Lehimleme bilmiyorum, başlayabilir miyim?'
    a: >-
      Evet — YouTube'da 30 dakikalık lehimleme tutorialı izle, ucuz kit al,
      pratik yap. 3-5 saat sonra yeterli olursun.
  - q: Homebrew cihaz fabrikasyondan daha mı iyi?
    a: >-
      Hayır — genel olarak fabrikasyon (IC-7300 vs) daha iyi çünkü profesyonel
      QC + DSP + yüksek güç. Homebrew öğrenme + özel çözüm + düşük güç için.
  - q: SMD lehimlemek zorunlu mu?
    a: >-
      Başlangıçta hayır — through-hole kit'ler yeter. İleri projelerde SMD
      gerek. ---
---
Hazır telsiz al, programla, kullan — kolay. Ama kendi yaptığın cihazdan gelen **ilk sesi duymak** = telsizcilik hayatındaki en büyük kırılma noktası. **Homebrew** = hazır ekipmana bağımlı kalmadan elektroniğin temel prensiplerini kullanarak istasyonunu inşa etme kültürü.

## Homebrew nedir?

Amatör radyonun kurucu ruhu. 1920'lerin ilk amatörleri **tüm cihazlarını kendileri yapıyordu** — hazır telsiz yoktu. Bugün hazır telsiz ucuz ama homebrew **öğrenme + tatmin + optimizasyon** için devam ediyor.

### Neden homebrew?

-   **Öğrenme**: RF devre prensibi, modülasyon, filtre — sınavda işe yarar, kariyere katkı
-   **Tatmin**: "Ben yaptım bu sesi dünya duyuyor" duygusu paha biçilemez
-   **Optimizasyon**: kendi antenine, koşuluna göre optimize cihaz
-   **Maliyet**: bazı kit'ler hazır ürünün 1/10 fiyatına

## Başlangıç projeleri (kolay → zor)

### 1\. Pixie QRP CW Transmitter (~$5-10)

Sadece **birkaç transistör + kristal** ile çalışan, avuç içine sığan mors telsizi.

-   1W çıkış, tek bant (7.023 MHz veya 14.060 MHz)
-   Toplam 15-20 parça
-   Lehimleme pratiği olarak mükemmel
-   CW biliyorsan ilk kontak 100 km menzilde

**Nereden:** AliExpress "Pixie QRP kit" arama, $3-5.

### 2\. QCX+ CW Transceiver (~$55)

QRP Labs'ın efsanevi kiti:

-   5W CW, tek bant (40m, 20m, 30m seçilebilir)
-   Built-in keyer + decoder + WSPR beacon
-   SMD yok, through-hole bileşenler → lehimleme kolay
-   200+ parça, 4-8 saat yapım
-   **POTA/SOTA QRP operasyon** için ideal

### 3\. (tr)uSDX All-Mode Transceiver (~$80-100)

Modern homebrew mucizesi:

-   **SSB + CW + FT8 + AM** — all mode, 5 bant (80-10m)
-   5W çıkış
-   Arduino tabanlı firmware (açık kaynak)
-   Dokunmatik LCD + menü
-   Kit veya hazır PCB
-   [QRP tutorial →](/tutorials/qrp-dusuk-guc-operasyonu)

### 4\. uBITX SSB Transceiver (~$150)

Ashhar Farhan (VU2ESE) tasarımı:

-   10W SSB/CW, 80-10m tüm bantlar
-   Arduino Nano kontrol
-   Hackerlar için cennet — firmware sürekli geliştiriliyor (CEC firmware)
-   Topluluk büyük, dokümantasyon bol

### 5\. Bitx40 → uBITX → uBITX v6 evrimi

Hindistan kökenli açık kaynak telsiz ailesi:

-   Bitx40 ($40) → tek bant → uBITX ($109) → tüm bant → uBITX v6 ($199) → premium

## Orta seviye projeler

### 6\. 49:1 EFHW Unun (balun)

Kendi sardığın balun fabrikasyondan daha verimli olabilir — **çünkü kendi anteninin koşullarına göre optimize edebilirsin**.

-   FT-240-43 toroid + enamel bakır tel
-   200 TL malzeme
-   [Balun yapımı detay →](/tutorials/balun-yapimi-rehberi)

### 7\. 1:1 Current Choke

-   FT-240-31 toroid + 8-10 sarım koaks
-   Common-mode current bastırma
-   100 TL malzeme, 30 dakika yapım

### 8\. Anten yapımı (çeşitli)

-   [J-Pole / Slim Jim →](/tutorials/anten-yapimi-temel)
-   [EFHW →](/tutorials/efhw-anten-detay-pota)
-   [Magnetic loop →](/tutorials/magnetic-loop-anten-yapimi)
-   [Vertical →](/tutorials/dikey-vertical-anten-detay)
-   [Yagi DK7ZB →](/tutorials/yagi-dk7zb-tasarim-derin)

### 9\. Dummy load

-   50Ω karbonfilm dirençler (20× 1kΩ paralel)
-   N veya SO-239 konnektör
-   Teneke kutu gövde
-   100W için yağ içinde (mineral yağ)
-   200 TL, verici test için zorunlu

### 10\. SWR köprüsü (basit)

-   Toroidal trafo + diod + resistor
-   İleri/geri güç ölçümü
-   Analog metre (eBay $5)

## İleri seviye projeler

### 11\. 100W lineer amplifier

-   IRF510 veya MRF150 MOSFET
-   Class AB push-pull
-   Heatsink + fan
-   LPF çıkış filtresi
-   $50-100 malzeme, profesyonel lehimleme gerek

### 12\. SDR transceiver

-   PlutoSDR + GNU Radio → tam yazılım tabanlı telsiz
-   [SDR tutorial →](/tutorials/sdr-yazilim-tabanli-telsiz)

### 13\. Arduino/ESP32 kontrol

-   VFO (Si5351 synthesizer + Arduino)
-   SWR metre dijital (Arduino + ADC)
-   Anten tuner otomatik (step motor + Arduino)
-   Meteor scatter receiver (RTL-SDR + Raspberry Pi)

## Araçlar ve malzemeler

### Temel aletler (~2000 TL)

-   **Lehim istasyonu** (Hakko FX-888D veya Çinli eşdeğer, ~800 TL)
-   **Multimetre** (dijital, ~200 TL)
-   **Pense + yan keski + sıyırıcı** (~300 TL)
-   **Büyüteç + üçüncü el** (~200 TL)
-   **Lehim teli** 60/40 tin-lead, 0.8mm (~100 TL)
-   **Flux** (temizleme)

### İleri aletler (~5000 TL)

-   **Osiloskop** Rigol DS1054Z (~$350)
-   **NanoVNA** (~$50)
-   **Tinysa Ultra** (~$120) — [Ölçüm tutorial →](/tutorials/spectrum-analyzer-amator-olcum)

### Malzeme tedarik

-   **AliExpress/Banggood** — bileşen, kit, modül
-   **Mouser/Digikey** — profesyonel kalite (kargo pahalı)
-   **Elektronik Malzeme** (Türkiye yerel mağazalar)
-   **QRP Labs** (qrp-labs.com) — QCX+, QDX kit
-   **HF Signals** (hfsignals.com) — uBITX

## Lehimleme temelleri

### Doğru lehimleme

1.  Ucu ısıt (2-3 saniye)
2.  Lehim teli hem uca hem bileşene değsin
3.  1-2 saniyede lehim aksın → parlak, konik şekil
4.  Ucü çek

### Yanlış (soğuk lehim)

-   Mat, pürüzlü yüzey = soğuk lehim
-   Mekanik olarak gevşek
-   RF'te kayıp + tutarsız empedans

### SMD vs Through-hole

-   **Through-hole**: büyük bileşen, delikli PCB → kolay, başlangıç
-   **SMD**: küçük bileşen, yüzey montaj → zor, pense + büyüteç gerek
-   Başlangıç kitleri through-hole tercih

## PCB tasarım (ileri)

### Yazılımlar (ücretsiz)

-   **KiCad** — açık kaynak, profesyonel
-   **EasyEDA** — web tabanlı, basit
-   **Fritzing** — Arduino odaklı, eğitsel

### PCB imalat

-   **JLCPCB** (Çin, $5/5 adet, 2 hafta)
-   **PCBWay** (Çin, benzer)
-   **OSH Park** (ABD, $10/3 adet, kaliteli)

## Homebrew toplulukları

### QRP-ARCI

-   DIY QRP transceiver topluluğu
-   Kit tasarım + swap meet
-   [qrparci.org](https://www.qrparci.org/)

### QRP Labs

-   Hans Summers (G0UPL) tek kişilik kit şirketi
-   QCX+, QDX, QLG2 (GPS) — dünya çapında 100K+ satış

### BITX/uBITX grupları

-   Google Groups "BITX20"
-   Facebook uBITX grubu

### Türkiye

-   TRAC bünyesinde homebrew ilgi grubu (küçük)
-   Üniversite elektronik kulüpleri

## Homebrew felsefesi

Hazır almak **kolay**, homebrew **öğretici**:

-   Devre şeması okuma → mühendislik temeli
-   Lehimleme → el becerisi
-   Debug → problem çözme yeteneği
-   "Ben yaptım" → kişisel tatmin

Contest'te 100W hazır telsizle 200 QSO yapan operatör vs homebrew 1W Pixie ile 1 DX kontak yapan operatör — **ikisi de amatör**, ikisi de haklı. Ama homebrew operatörünün öğrendiği bilgi karşılaştırılamaz.

## Sık sorulan sorular

### Homebrew telsiz yasal mı?

Evet — lisanslı amatör kendi yaptığı cihazla TX yapabilir. Ama **harmonik emisyon** sınırlarına uymalı (LPF zorunlu).

### En ucuz homebrew setup?

Pixie CW kit ($5) + dipole ($5 tel) + pil ($10) = **$20** ile HF kontak.

### Lehimleme bilmiyorum, başlayabilir miyim?

Evet — YouTube'da 30 dakikalık lehimleme tutorialı izle, ucuz kit al, pratik yap. 3-5 saat sonra yeterli olursun.

### Homebrew cihaz fabrikasyondan daha mı iyi?

Hayır — genel olarak fabrikasyon (IC-7300 vs) daha iyi çünkü profesyonel QC + DSP + yüksek güç. Homebrew **öğrenme + özel çözüm + düşük güç** için.

### SMD lehimlemek zorunlu mu?

Başlangıçta hayır — through-hole kit'ler yeter. İleri projelerde SMD gerek.

* * *

## İlgili kaynaklar

-   [QRP düşük güç operasyonu](/tutorials/qrp-dusuk-guc-operasyonu) — homebrew cihaz kullanımı
-   [Balun yapımı](/tutorials/balun-yapimi-rehberi) — kendi balununu sar
-   [EFHW anten detay](/tutorials/efhw-anten-detay-pota) — kendi antenini yap
-   [RF amplifier sınıfları](/tutorials/rf-amplifier-siniflari) — amplifier tasarımı
-   [Spectrum analyzer ölçüm](/tutorials/spectrum-analyzer-amator-olcum)
-   QRP Labs: [qrp-labs.com](https://www.qrp-labs.com/)
-   HF Signals (uBITX): [hfsignals.com](https://www.hfsignals.com/)
-   KiCad: [kicad.org](https://www.kicad.org/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — homebrew makaleleri
