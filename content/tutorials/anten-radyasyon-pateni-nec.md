---
title: Anten Radyasyon Patterni ve NEC Simülasyon
description: >-
  Anten radyasyon patterni — azimuth + elevation lobu, ön/arka oran (F/B), null
  açıları. NEC (4nec2, MMANA-GAL) ile simülasyon, dipole/Yagi/vertical pattern
  karşılaştırma.
keywords:
  - anten
  - pattern
  - NEC
  - simülasyon
  - gain
  - theory
article_section: anten
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: NEC sonucu gerçek dünyada doğru mu?
    a: >-
      Ortam complex (binalar, ağaçlar) — ±2 dB tolerans. Trend doğru, mutlak
      değer ±2 dB.
  - q: 'Hangisi daha kolay: NEC, MMANA, EZNEC?'
    a: '- MMANA-GAL — başlangıç dostu - 4nec2 — Windows klasik - EZNEC — pro, $90'
  - q: Smith Chart'tan anten pattern alabilir miyim?
    a: >-
      Hayır — Smith Chart empedans gösterir, pattern değil. NEC pattern için
      ayrı.
  - q: NEC'siz anten yapabilir miyim?
    a: >-
      Evet — geleneksel formula yeter (dipole = λ/2). NEC sadece optimize /
      fine-tune için. ---
---
"Bu Yagi 12 dBi gain" reklam — hangi yönde? Anten radyasyon **deseni** (pattern) şeklini gösteriyor: maksimum kazanç, ön/arka oran, null açıları. Bu rehber pattern'in fiziği + NEC simülasyon.

## Anten patterni nedir?

3D küre etrafında radyasyon dağılımı. Genelde 2D plot:

-   **Azimuth (yatay)**: 0-360°, anten yön deseni
-   **Elevation (dikey)**: 0-90°, anten yükseklik deseni

### Lob yapısı

-   **Main lobe** — maksimum kazanç yönü
-   **Side lobes** — yan loblar (parazit yön)
-   **Back lobe** — arka lob (anten arka yönü)
-   **Nulls** — sıfır radyasyon noktaları

## Klasik anten pattern'leri

### Dipole (yatay)

-   **Azimuth**: 8 şekli — dipole'a dik 0 dB, dipole boyunca -∞ (null)
-   **Elevation**: yarım kalp şekli, alçaksa NVIS, yüksekse DX
-   2.15 dBi gain

### Vertical (¼λ)

-   **Azimuth**: omnidireksiyonel (360° eşit)
-   **Elevation**: alçak açı, düşük yükseklikte (5-30°)
-   0-1 dBi gain (radyallerle)

### Yagi (yönlü)

-   **Azimuth**: directional, 60° beam width tipik
-   **Elevation**: orta-yüksek açı
-   7-15 dBi gain
-   F/B ratio: 15-30 dB (arka radyasyon az)

### Loop (dik)

-   **Azimuth**: 8 şekli (loop düzlemine dik)
-   **Elevation**: yatay loop = NVIS, dikey = DX

## Önemli parametreler

### Beam width

3 dB altı yön açısı. Yagi 60°, parabol 5°.

### F/B ratio (front-to-back)

Ön lob / arka lob = sayısal kazanç. 20 dB iyi, 30 dB mükemmel.

### Side lobe level

İkinci en kuvvetli lob seviyesi. -20 dB altı temiz.

### Gain pattern integral

Total **radyasyon güç eşitliği** — gain = output / input × pattern.

## NEC simülasyon

NEC (Numerical Electromagnetics Code) = anten matematik motoru. Anten geometrisini gir → pattern + SWR + gain hesaplar.

### Yazılımlar (ücretsiz)

-   **4nec2** (Windows) — klasik, geniş community
-   **MMANA-GAL** (Win/Linux) — Japon kökenli, arayüz dostu
-   **EZNEC** ($90, Win) — premium
-   **xnec2c** (Linux) — açık kaynak

### Kullanım akışı

#### Adım 1: Anten geometrisi

Wire'ları girer:

```
Wire 1: from (-10m, 0, 5m) to (10m, 0, 5m), radius 1mm
        # 20m yatay dipole, 5m yer üstünde
Wire 2: feed point at center
```

#### Adım 2: Frekans + ortam

-   Frekans: 7.1 MHz
-   Ground type: average soil
-   Antenna feed: 50Ω

#### Adım 3: Hesapla

Tıkla → 1-10 saniye sonra:

-   **SWR**: 1.4
-   **Empedans**: 65+j10 Ω
-   **Gain**: 7.5 dBi (yer dahil)
-   **Pattern**: 3D plot

#### Adım 4: Optimize

-   Boyu değiştir, yeniden hesapla
-   Yükseklik değiştir
-   Metal yapılar yakındaysa modelle

## Yer etkisi

NEC simulasyonda **yer önemli** — gerçek dünya yansıması:

### Dipole yükseklik

| Yükseklik (λ) | Maks gain açısı |
| --- | --- |
| 0.1 (alçak) | 75° (NVIS) |
| 0.25 | 60° |
| 0.5 | 30° |
| 1.0 | 15° (DX) |

Yatay dipole yer etkisiyle "yarısının" pattern'i toplanır → maksimum gain noktası şift olur.

### Vertical

-   İletkenlik kötü zemin → -3 dB gain
-   Deniz suyu → +6 dB (sahil DX altın)

## Yagi tasarım

NEC ile Yagi tasarımı:

1.  Driven element (½λ dipole)
2.  Reflector arkada (5% uzun, 20% mesafe)
3.  Director'ler önde (3-5% kısa, 10-30% mesafe)

Her director **ekstra gain** (~+1 dB) ama beam width daralır.

### DK7ZB design

Alman Martin Steyer'in (DK7ZB) Yagi tasarımı:

-   Lower-Q driven element (50Ω direct match)
-   3-element: 7 dBd gain
-   5-element: 9 dBd
-   Geniş bantlı, robust

[Yagi anten tutorialımız →](/tutorials/yagi-anten-yapimi)

## Pratik amatör kullanımı

### Senaryo 1: 80m dipole

-   4m yükseklikte
-   NEC: %95 NVIS pattern (30-50 km)
-   DX yapamaz (90° açı yok)

### Senaryo 2: 20m Yagi

-   15m yükseklikte
-   NEC: 10° max açı
-   DX altın

### Senaryo 3: vertical

-   10m yüksek
-   8 radyal
-   NEC: omni 5° açı, DX iyi

## Pattern öğrenme — pratik

NEC eğrisi 1 saatlik öğrenme. Sonra her antene yapay test:

-   Dipole boyu değiştir → patterndaki kayma
-   Yagi element ekle → gain artışı + beam width darlığı
-   Yer iletkenliği → vertical performans

## Sık sorulan sorular

### NEC sonucu gerçek dünyada doğru mu?

Ortam complex (binalar, ağaçlar) — ±2 dB tolerans. Trend doğru, mutlak değer ±2 dB.

### Hangisi daha kolay: NEC, MMANA, EZNEC?

-   **MMANA-GAL** — başlangıç dostu
-   **4nec2** — Windows klasik
-   **EZNEC** — pro, $90

### Smith Chart'tan anten pattern alabilir miyim?

Hayır — Smith Chart **empedans gösterir**, pattern değil. NEC pattern için ayrı.

### NEC'siz anten yapabilir miyim?

Evet — geleneksel formula yeter (dipole = λ/2). NEC sadece **optimize / fine-tune** için.

* * *

## İlgili kaynaklar

-   [Anten yapımı temel](/tutorials/anten-yapimi-temel)
-   [Yagi anten yapımı](/tutorials/yagi-anten-yapimi)
-   [Vertical anten detay](/tutorials/dikey-vertical-anten-detay)
-   [dB/dBi/dBd anten kazancı](/tutorials/db-dbi-dbd-anten-kazanci)
-   [Anten polarizasyonu](/tutorials/anten-polarizasyonu-detay)
-   4nec2: [qsl.net/4nec2](https://www.qsl.net/4nec2/)
-   MMANA-GAL: [hamsoft.ca/pages/mmana-gal](https://hamsoft.ca/pages/mmana-gal.php)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/)
