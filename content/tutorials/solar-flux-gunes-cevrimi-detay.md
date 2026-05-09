---
title: Solar Flux ve Güneş Çevrimi (Cycle 25) — HF Propagasyonun Anahtarı
description: >-
  Solar Flux Index (SFI), sunspot, A-index, K-index detaylı. 11 yıllık güneş
  çevrimi (Cycle 25 zirve 2025-2026), CME ve geomanyetik fırtına, MUF tahmini.
keywords:
  - solar flux
  - SFI
  - sunspot
  - K-index
  - propagasyon
  - Cycle 25
article_section: solar flux
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: SFI" ile "Sunspot" hangisi daha iyi?
    a: >-
      SFI objektif ölçüm (radyometr ile). Sunspot subjektif sayım (gözle /
      fotoğraf). SFI daha güvenilir, ama sunspot tarih perspektifi (300 yıl
      arşiv).
  - q: Cycle 26 ne zaman zirve?
    a: 'Tahmin: 2034-2035 civarı. Cycle 25 zayıflarsa 26 daha güçlü olabilir.'
  - q: CME tehlikeli mi?
    a: >-
      - Direct hit + Bz south → güç şebekesi voltage spike, satellite arızası -
      Tarihte 1859 Carrington Event en büyük (telgraf hattı yandı, aurora
      ekvatora kadar) - 2003 Halloween Storm aviation iletişim bozulması
  - q: Türkiye'den aurora görülür mü?
    a: >-
      - 39° kuzey enlem normal aurora hat dışı - 1859 Carrington Event tarzı
      extrem fırtına → evet görülebilir - Modern dönemde 2003, 2024 olaylarında
      raporlanan görme
  - q: Solar minimum'da ham radio "ölmez
    a: >-
      - 80m + 40m hep aktif - Düşük SFI'da bile DX yapılır (FT8 weak signal
      mucizesi) - Solar minimum = "EmComm + dijital + lokal" odaklı dönem ---
---
[Propagasyon canlı durum](/araclar/propagasyon-durumu/) widgetımız NOAA verisi gösterir. Bu tutorial: **rakamların ne anlama geldiği** — SFI 150 nedir, K-index 4 niye HF zayıflatır, Cycle 25 zirvesi neden DX'in altın çağı.

HF haberleşmesi aslında dünyanın en büyük kablosuz ağının **iyonosfere "format atılması"** sürecidir. Bu formatı atan güç Güneş'tir. Güneş'in ritmini, lekelerini ve manyetik fırtınalarını çözemezsen, en iyi telsiz bile masanda gürültü kutusu olarak kalır.

## Güneş çevrimi (11-year cycle)

Güneşin manyetik aktivitesi 11 yıllık periyotla yükselip düşer. 1755'ten beri sayılır:

-   **Solar minimum**: az sunspot, düşük SFI, iyonosfer zayıf → 10m/15m bantları "ölü"
-   **Solar maksimum**: çok sunspot, yüksek SFI, iyonosfer iyonize bulutlarla dolu → 5 Watt'la dünyanın öbür ucuna ulaşırsın. Sunspot sayısı **100'ün üzerine çıktığında bayram başlar!**

### Cycle 25 (2020-2031, şu anda zirve)

-   2020: minimum (SFI ~70)
-   2024-2026: **maksimum** (SFI 150-200+)
-   2030: minimum (yeniden ~70)

Şu anda **Cycle 25 zirvesi** — DX yapacaksanız **şimdi yapın**. 2027-2030'da bantlar eski haliyle "ölü" olabilir.

### Tarih

-   **Cycle 19** (1957-1958): SFI 200+, en aktif rekoru
-   **Cycle 23** (1996-2008): orta
-   **Cycle 24** (2008-2019): zayıf — bilim adamları "uzun minimum başlıyor mu" sorusu
-   **Cycle 25**: orta-iyi, beklenenden güçlü

## Solar Flux Index (SFI)

Güneşin **10.7 cm dalga boyundaki radyo emisyonu** ölçüsü. Iyonosfer iyonizasyonun proxy'si.

### Birim

**Solar Flux Unit (sfu)** = 10⁻²² W/m²/Hz. Klasik amatör radyo kısaltma "SFI = X" şeklinde söyler.

### Değerler

| SFI | Yorum | HF etkisi |
| --- | --- | --- |
| 60-70 | Solar min | 80m/40m only, 20m+ zayıf |
| 80-100 | Düşük | 40m+20m yeterli, 15/10m zayıf |
| 100-130 | Orta | 20m+15m iyi, 10m sometimes |
| 130-180 | Yüksek | **HF DX altın** — 10m+12m+15m+20m sürekli açık |
| 180-250 | Çok yüksek | Mucize koşullar, dünya çapında 5W kontağı |
| 250+ | Extrem | Cycle 19 seviyesi — F2 katmanı çok yoğun |

### Pratik

SFI günlük güncellenir, [propagasyon widget](/araclar/propagasyon-durumu/) görür. NOAA tahmin de var (1-3 hafta öncesi).

### Türkiye 2026

-   SFI 130-180 ortalama
-   10m, 12m bantları gündüz sürekli açık
-   80m gece DX altın

## Sunspot Number (SSN)

Güneş yüzeyindeki **siyah lekeler** — manyetik alan yoğunlaşması. Sayım tarihi 1700'lerden başlar.

### Hesaplama

Wolf Number = 10 × (sunspot grupları) + (toplam tek lekeler)

Modern: SDIC (Solar International Brussels) günlük yayın.

### SFI vs SSN ilişki

-   SFI = 73.4 + 0.62 × SSN (yaklaşık)
-   Sunspot ↑ → SFI ↑

### Pratik

-   SSN 30 altı: minimum
-   SSN 100+: orta-yüksek
-   SSN 200+: zirve

Cycle 25 ortalama SSN ~130-180.

## K-index ve A-index (geomanyetik)

Güneş **stabil** SFI yüksek olabilir ama K-index yüksek olunca HF blackout.

### K-index (3-saatlik)

-   0-9 ölçek
-   Manyetik alan **fluctuation** ölçüsü
-   8 istasyon dünya çapında ortalama → planetary K (Kp)

| K | Yorum | HF etkisi |
| --- | --- | --- |
| 0-1 | Sakin | Mükemmel propagasyon |
| 2-3 | Hafif aktif | Normal |
| 4 | Aktif | Hafif distortion |
| 5 | Minor storm | HF zayıflar, polar yollar kapanır |
| 6-7 | Major storm | HF blackout, aurora görünür |
| 8-9 | Şiddetli | Tüm HF kapanır, GPS bozulur, satellite zarar |

### A-index (24-saatlik)

-   0-400 ölçek
-   24-saatlik K ortalama yaklaşık
-   Geomanyetik aktiviteyi günlük göstergesi

### Sebep: CME (Coronal Mass Ejection)

Güneşten kütle atılması:

-   Plazma + manyetik alan dünyaya gelir
-   1-3 günde varır
-   Manyetik alan bozulur → K-index zirvesi
-   1-3 gün sürer fırtına

### Aurora etkisi

K-index 5+ → kutup ışıkları görünür, **VHF aurora propagasyon** açılır (yan ürün).

## MUF / LUF tahmini

Solar koşullarından **Maximum Usable Frequency** hesaplanır:

### Basit formül

-   F2 critical frequency (foF2) ile MUF
-   MUF ≈ foF2 × 3 (yaklaşık)
-   foF2 SFI'ya bağlı

### Pratik tahmin

-   SFI 70: MUF 12-15 MHz
-   SFI 100: MUF 18-22 MHz
-   SFI 150: MUF 25-32 MHz
-   SFI 200: MUF 35-40 MHz

### Tools

-   [VOACAP](https://www.voacap.com/hf/) — HF prediction
-   [HamCAP](https://hamcap.dxatlas.com/) — Windows
-   [W6ELProp](http://www.qsl.net/w6elprop/) — klasik

Bu tools mesafe + tarih + SFI verirsen → en iyi bant tahmin.

## Solar olayları takibi

### NOAA SWPC

-   [swpc.noaa.gov](https://www.swpc.noaa.gov/)
-   Resmi US devlet kuruluşu
-   24/7 günlük raporlar
-   Email alert sistemi (CME warning, K-index alarm)

### Spaceweather.com

-   Daha popüler/dostu format
-   Aurora forecast, solar wind
-   Photographer / amatör astronomers tarafından popüler

### Amatör radyo özel

-   **DXCC propagation** (DXMaps.com)
-   **WSPR network** (real-time MUF map)
-   **PSK Reporter** (signal reception data)

## SFI etkisi bant başına

### 80m (3.5 MHz)

-   SFI'ya **az duyarlı**
-   D katmanı gündüz emer (her durumda)
-   Gece F2 yansıtır — SFI önemli değil

### 40m (7 MHz)

-   Orta duyarlı
-   Gündüz NVIS olur (yüksek SFI'da)
-   Gece DX

### 20m (14 MHz)

-   **DX bantın iskeleti**
-   SFI 80+ ile günboyu açık
-   SFI 130+ ile gece bile yarısı açık

### 15m (21 MHz)

-   SFI 100+ açık
-   SFI 80 altı zayıf
-   Cycle 25 ile altın çağ

### 10m (28 MHz)

-   **SFI 130+** ile gündüz sürekli açık
-   SFI 100 altı sadece Sporadic E
-   Cycle 25 zirvesi süresince DX şenliği

### 6m (50 MHz)

-   F2 propagasyon nadir (SFI >180)
-   Sporadic E yaz aylarında
-   Cycle zirvesinde **F2 backscatter** açıklığı

## Solar wind ve dünya etkileri

### Solar wind speed

-   Normal: 300-400 km/s
-   Yüksek hız stream: 600-800 km/s → fırtına
-   CME impact: 1000-2000 km/s

### Bz component

Manyetik alan kuzey-güney bileşeni:

-   **Bz negative (south)**: dünya manyetiğine ters → fırtına başlar
-   **Bz positive (north)**: dünya korunmuş

CME geldiğinde Bz işaretleri kritik.

## Cycle 25 zirvesi DX strateji

### Şimdi (2026)

-   **10m + 15m bantları her zaman önce** dene
-   Gündüz yarım dakikada bir bant değiştir → bantta DX gör
-   Akşam 80m'e dön

### Yıl sonu (2027)

-   SFI yavaşça düşer
-   10m kapanmaya başlar
-   15m'e + 20m'e güven

### 2030 (minimum)

-   Sadece 80m + 40m + 20m gece
-   DX zoru — Cycle 26 bekle (2031 başlar)

## DX hunting taktiği SFI'ya göre

### High SFI (zirve)

-   **Tüm bantlar** check
-   Yüksek band (10m, 12m) DX altın
-   Düşük güç (5W FT8) yeter — propagasyon kompensasyon

### Medium SFI (orta)

-   20m + 15m gündüz
-   40m gece
-   DX zorlaşır, 50-100W güç

### Low SFI (minimum)

-   80m + 40m gece
-   20m gündüz limited
-   100W+ güç + iyi anten

## Solar olayları amatör için tavsiye

### Yaz aylarında

-   6m monitor (Sporadic E)
-   Aurora season (CME aktivite yüksek)
-   Tropo açıklığı (sıcak hava)

### Kış aylarında

-   80m altın çağı (D katmanı zayıf)
-   Gri çizgi DX (kısa gündüz periyot)
-   40m sürekli açık

### Kontest günlerinden önce

-   SWPC tahmin kontrol
-   Eğer K>4 bekleniyorsa kontest performans düşer
-   Yedek strateji: dijital modlar (FT8) zayıf koşullarda dahil çalışır

## Sık sorulan sorular

### "SFI" ile "Sunspot" hangisi daha iyi?

SFI **objektif ölçüm** (radyometr ile). Sunspot **subjektif sayım** (gözle / fotoğraf). SFI daha güvenilir, ama sunspot tarih perspektifi (300 yıl arşiv).

### Cycle 26 ne zaman zirve?

Tahmin: **2034-2035** civarı. Cycle 25 zayıflarsa 26 daha güçlü olabilir.

### CME tehlikeli mi?

-   Direct hit + Bz south → güç şebekesi voltage spike, satellite arızası
-   Tarihte 1859 Carrington Event en büyük (telgraf hattı yandı, aurora ekvatora kadar)
-   2003 Halloween Storm aviation iletişim bozulması

### Türkiye'den aurora görülür mü?

-   39° kuzey enlem normal aurora hat dışı
-   1859 Carrington Event tarzı extrem fırtına → evet görülebilir
-   Modern dönemde 2003, 2024 olaylarında raporlanan görme

### Solar minimum'da ham radio "ölmez"

-   80m + 40m hep aktif
-   Düşük SFI'da bile DX yapılır (FT8 weak signal mucizesi)
-   Solar minimum = "EmComm + dijital + lokal" odaklı dönem

* * *

## İlgili kaynaklar

-   [HF propagasyon canlı durum](/araclar/propagasyon-durumu/) — NOAA SFI/K real-time
-   [HF propagasyon temelleri](/tutorials/hf-propagasyon-temelleri)
-   [İyonosfer katmanları](/tutorials/ionosfer-katmanlari-detay)
-   [Egzotik propagasyon](/tutorials/meteor-scatter-eme-egzotik)
-   [DXCC ve DX hunting](/tutorials/dxcc-dx-hunting)
-   NOAA SWPC: [swpc.noaa.gov](https://www.swpc.noaa.gov/)
-   VOACAP: [voacap.com](https://www.voacap.com/)
-   Spaceweather: [spaceweather.com](https://www.spaceweather.com/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — solar cycle makaleleri
