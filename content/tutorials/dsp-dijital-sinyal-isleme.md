---
title: DSP (Dijital Sinyal İşleme) ve Modern Telsizcilik
description: >-
  DSP temelleri — ADC, DAC, Fourier transform, brick-wall filtre, dijital
  gürültü azaltma (DNR), auto-notch. IC-7300 SDR mimarisi, DSP vs analog filtre
  farkı.
keywords:
  - DSP
  - dijital
  - sinyal işleme
  - ADC
  - filtre
  - theory
article_section: DSP
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: DSP'siz telsiz kullanılır mı?
    a: >-
      Evet — eski telsizler (Kenwood TS-830, Yaesu FT-101) tamamen analog, hâlâ
      çalışıyor. Ama modern konfor (auto-notch, NR, waterfall) yok.
  - q: DSP gecikme sorun mu?
    a: >-
      1-5 ms gecikme insan kulağı fark etmez. CW QSO'da 50+ ms gecikme sorun
      olabilir — modern DSP'ler bunu 2 ms'e indirdi.
  - q: DSP ile analog filtre birlikte mi?
    a: >-
      Evet — roofing filter (analog, geniş bant, ilk kademe IF koruma) + DSP
      filtre (dar bant, son kademe ses şekillendirme). İkisi complement.
  - q: DSP'li telsiz daha mı pahalı?
    a: >-
      Artık hayır — DSP chip çok ucuz. $500 telsizlerde bile DSP var (Xiegu
      G90). Fark ADC kalitesi.
  - q: KEGM sınavında DSP sorusu çıkar mı?
    a: >-
      A sınıfı sınavında temel DSP kavramı sorulabilir. B/C sınavında pratik
      (NR, notch ne işe yarar) sorulur. ---
---
1990 öncesi "filtreleme" = tornavidayla fiziksel bobin ayarı. 1990 sonrası **DSP** = sinyal sayılara dönüşür, matematik ile temizlenir, kulağına ses olarak geri gelir. Modern telsizlerin (IC-7300, FT-991A) içindeki **gizli silah** DSP'dir. Bu rehber DSP'nin ne yaptığı + amatör operatör için pratik anlamı.

## DSP nedir?

**Digital Signal Processing** = analog sinyali dijitale çevirip, üzerinde matematik yapmak, sonra tekrar analoğa çevirmek.

### Akış

```
Anten → [Analog RF] → ADC → [Dijital sayı dizisi] → DSP algoritma → DAC → [Analog ses] → Hoparlör
```

-   **ADC** (Analog-to-Digital Converter): sürekli dalgayı saniyede milyonlarca kez örnekleyerek **sayı dizisine** çevirir
-   **DSP işlem**: toplama, çıkarma, çarpma, Fourier transform → sinyali istediğin şekle sok
-   **DAC** (Digital-to-Analog Converter): sayıları tekrar kulağın duyacağı sese çevirir

## DSP'nin 4 büyük silahı

### 1\. Brick-wall filtre (tuğla duvar)

Analog filtrelerde geçirme bandı asla tam dikdir — kenarlardan sızıntı olur. DSP ile **tam dik** kesim mümkün:

-   2.400 kHz genişliğinde filtre ayarladığında, 2.401 kHz'deki sinyal **tamamen** yok olur
-   Yan frekanstaki güçlü istasyon seni artık rahatsız etmez
-   Ayarlanabilir: 100 Hz (CW) ↔ 3 kHz (SSB) tek düğmeyle

**Pratik:** IC-7300'de "BW" düğmesini çevir → DSP filtre genişliği ayarlanır. CW'de 150 Hz seç → sadece mors tonları geçer, rest bastırılır.

### 2\. Dijital gürültü azaltma (DNR / NR)

-   Sinyal + gürültü karışımından **konuşma sesini** korur, arka plan gürültüsünü bastırır
-   10-20 dB perceived improvement
-   IC-7300: NR düğmesi (level 1-15)
-   **Dikkat:** aşırı NR → "tünel efekti" (ses boğuk)

### 3\. Auto-notch

-   CW bantlarında tek tonlu parazit → DSP otomatik algılar, **o tonu bastırır**
-   El ile notch frekansı ayarlamaya gerek yok
-   IC-7300: "Notch" buton → otomatik

### 4\. Noise blanker (NB)

-   Pulse noise (motor, ateşleme, switching) → DSP anlık "atımları" siler
-   Atomsferik/broadband noise için etkisiz
-   IC-7300: NB level 1-10

## DSP vs analog filtre

|  | Analog filtre | DSP filtre |
| --- | --- | --- |
| **Kesim netliği** | Yumuşak kenar (roll-off) | Dik kenar (brick-wall) |
| **Ayarlanabilirlik** | Sabit veya sınırlı | Sonsuz (yazılım) |
| **Maliyet** | Kristal filtre $50-200 | DSP chip $5-20 |
| **Gecikme** | Sıfır | 1-5 ms (genelde fark edilmez) |
| **Auto-notch** | Yok | Var |
| **Gürültü azaltma** | Temel | Gelişmiş (ML/AI) |

Modern telsizlerin %95'i DSP kullanır. Analog kristal filtre sadece **IF roofing** (ilk kademe) olarak kalır.

## ADC kalitesi — neden önemli?

ADC'nin **bit derinliği** dinamik aralığı belirler:

-   **8-bit**: 48 dB (RTL-SDR — ucuz)
-   **12-bit**: 72 dB (Airspy — orta)
-   **14-bit**: 84 dB (IC-7300 — profesyonel)
-   **16-bit**: 96 dB (Flex Radio — premium)

Daha yüksek bit = güçlü sinyal yanında zayıf sinyali duyma yeteneği artışı. 14-bit ADC'li IC-7300 yanı başındaki S9+40 broadcast istasyonunun altında -120 dBm'lik weak signal'ı decode edebilir.

### Sample rate

-   Nyquist teoremi: örnekleme hızı ≥ 2 × max frekans
-   IC-7300: 14.4 MHz sample rate → DC-7.2 MHz direkt örnekleme
-   30 MHz üstü için analog down-conversion + DSP

## Fourier Transform — DSP'nin matematik kalbi

Sinyal = farklı frekanslardaki sinüs dalgalarının toplamı. **FFT (Fast Fourier Transform)** = bu karışımı frekans bileşenlerine ayırır.

### Pratik sonuç

-   Waterfall display = FFT çıktısı → her frekans noktasındaki sinyal gücü görsel
-   IC-7300 ekranındaki **renkli waterfall** = DSP'nin FFT'si
-   Her piksel = FFT'den çıkan bir frekans noktasının gücü

## DSP + modern telsiz

### Icom IC-7300 (SDR)

-   Direct sampling ADC 14-bit
-   Tüm IF filtreleme DSP'de
-   Waterfall display real-time FFT
-   Auto-notch, NR, NB hepsi DSP

### Yaesu FT-991A

-   Hybrid: analog IF + DSP post-processing
-   Contour filter (DSP ses profil şekillendirme)
-   DNR + auto-notch

### Elecraft KX2/KX3

-   Analog roofing filter + DSP son kademe
-   8 bant DSP filter

## DSP vs AI (gelecek)

### Mevcut DSP

-   Sabit algoritmalar (FFT, FIR/IIR filtre)
-   Önceden tanımlanmış parametreler

### AI-enhanced DSP (gelecek)

-   Machine learning ile ses tanıma
-   Konuşma/gürültü otomatik ayrım
-   20-30 dB iyileştirme (DSP'nin 10-15 dB'sine göre)
-   [Yapay zeka + ham radio →](/tutorials/amator-radyo-yapay-zeka)

## Sık sorulan sorular

### DSP'siz telsiz kullanılır mı?

Evet — eski telsizler (Kenwood TS-830, Yaesu FT-101) tamamen analog, hâlâ çalışıyor. Ama modern konfor (auto-notch, NR, waterfall) yok.

### DSP gecikme sorun mu?

1-5 ms gecikme insan kulağı fark etmez. CW QSO'da 50+ ms gecikme sorun olabilir — modern DSP'ler bunu 2 ms'e indirdi.

### DSP ile analog filtre birlikte mi?

Evet — **roofing filter** (analog, geniş bant, ilk kademe IF koruma) + **DSP filtre** (dar bant, son kademe ses şekillendirme). İkisi complement.

### DSP'li telsiz daha mı pahalı?

Artık hayır — DSP chip çok ucuz. $500 telsizlerde bile DSP var (Xiegu G90). Fark ADC kalitesi.

### KEGM sınavında DSP sorusu çıkar mı?

A sınıfı sınavında temel DSP kavramı sorulabilir. B/C sınavında pratik (NR, notch ne işe yarar) sorulur.

* * *

## İlgili kaynaklar

-   [SDR yazılım tabanlı telsiz](/tutorials/sdr-yazilim-tabanli-telsiz) — DSP'nin evi
-   [RF filtre tipleri](/tutorials/rf-filter-tipleri-bilimi) — analog filtre
-   [RF gürültü tipleri](/tutorials/rf-gurultu-tipleri-bastirma) — DSP NR kullanımı
-   [Yapay zeka + ham radio](/tutorials/amator-radyo-yapay-zeka) — AI DSP
-   [Spectrum analyzer ölçüm](/tutorials/spectrum-analyzer-amator-olcum) — FFT waterfall
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — DSP makaleleri
