---
title: 'Random Wire Anten + 9:1 Unun — Rastgele Uzunluk, Tüm Bantlar'
description: >-
  Random wire (rastgele uzunluklu tel) anten rehberi. 9:1 unun ile tüm HF
  bantlarda tuner ile çalışma, EFHW farkı, avantaj/dezavantaj, pratik kurulum
  ipuçları.
keywords:
  - random wire
  - '9:1 unun'
  - anten
  - HF
  - çoklu bant
  - başlangıç
article_section: random wire
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Tuner olmadan random wire çalışır mı?
    a: >-
      Hayır — empedans uyumsuz, SWR 5-20:1. Telsiz koruma moduna geçer, güç
      vermez. Tuner zorunlu.
  - q: En kısa random wire?
    a: 5m minimum — daha kısa HF'te yetersiz. 10m+ önerilir.
  - q: Random wire vs dipole hangisi?
    a: >-
      Dipole her zaman daha iyi (rezonant, dengeli, verimli). Random wire =
      dipole kuramadığında çözüm.
  - q: '9:1 unun yerine 1:1 balun olur mu?'
    a: 'Olmaz — 1:1 balun 50Ω→50Ω, random wire 200-800Ω. 9:1 gerek.'
  - q: Çelik tel kullanabilir miyim?
    a: Evet ama bakırdan %30-50 daha kayıplı. Bakır tercih. ---
---
EFHW belirli uzunlukta kesilmiş yarım dalga — harmonik bantlarda tuner'sız çalışır. **Random wire** = rastgele uzunlukta tel, **tuner ile** tüm bantlarda çalışır. Daha esnek ama daha az verimli. Bu rehber random wire ne zaman mantıklı + 9:1 unun yapımı.

## EFHW vs Random Wire farkı

|  | EFHW | Random Wire |
| --- | --- | --- |
| **Boy** | Yarım dalga (20m = 40m bandı) | Rastgele (10-30m arası her şey) |
| **Empedans** | 2450Ω (49:1 unun) | 200-800Ω (9:1 unun) |
| **Tuner gerek** | Hayır (harmonik bantlarda) | **Evet** (tüm bantlarda) |
| **Multi-band** | 4 bant doğal | **Tüm bantlar** (tuner ile) |
| **Verim** | Yüksek (rezonant) | Orta (tuner kayıp) |
| **Esneklik** | Sabit boy | İstediğin uzunluk |

## Random wire ne zaman?

### ✓ Mantıklı durumlar

-   **Yer kısıtlı** — bahçede sadece 12m tel çekebiliyorsun (EFHW 40m için 20m gerek)
-   **Tüm bantlar** — 160m'den 10m'ye tek anten (tuner ile)
-   **Geçici kurulum** — hızlı, boy hesabı yok, "ne bulursan at"
-   **Apartman** — pencereden dışarı tel, ne kadar giderse

### ✗ Mantıksız durumlar

-   EFHW yapabiliyorsan → EFHW daha verimli
-   Tuner'ın yoksa → random wire çalışmaz
-   **Çok kısa tel** (<5m) → HF'te verim yok

## 9:1 Unun nedir?

Random wire empedansı ~200-800Ω arası (banttan banta değişir). Koaks 50Ω. **9:1 unun** = 450Ω → 50Ω dönüşüm. Mükemmel match değil ama tuner'ın işini kolaylaştırır.

### 9:1 vs 49:1 farkı

-   **49:1** = EFHW için (2450Ω → 50Ω), rezonant anten
-   **9:1** = random wire için (450Ω → 50Ω), non-rezonant anten + tuner

### 9:1 unun yapımı

**Malzeme:**

-   FT-140-43 veya FT-240-43 toroid
-   Enamel bakır tel 1mm
-   SO-239 konnektör
-   M5 cıvata (anten teli bağlantı)

**Sarım (trifilar):**

-   Üç tel paralel, 10 sarım toroid etrafına
-   Üç telin bağlantısı:
    -   Tel-A başı → SO-239 inner (koaks merkez)
    -   Tel-A sonu + Tel-B başı → birleşik (orta tap)
    -   Tel-B sonu + Tel-C başı → birleşik
    -   Tel-C sonu → anten teline (M5)
    -   SO-239 outer → toprak / counterpoise
-   9:1 impedance ratio = 3² sarım oranı

**Maliyet:** ~150 TL (ferrit + tel + konnektör)

[Balun yapımı detay →](/tutorials/balun-yapimi-rehberi)

## Pratik kurulum

### Malzeme

-   10-30m AWG-22 bakır tel (ne varsa)
-   9:1 unun (DIY veya hazır)
-   Koaks 5-15m (RG-8X veya RG-58)
-   Tuner (telsiz dahili veya harici)
-   Counterpoise 5m tel (opsiyonel ama önerilir)

### Kurulum

```
[Ağaç/direk]
    │
    ● insulator
    │
  ~15m tel (ne kadar olursa)
    │
    ● 9:1 unun
    │ koaks
    │
  [Tuner] → [Telsiz]
```

1.  Teli mümkün olduğunca **yükseğe** ve **düz** çek
2.  Unun tel ile koaks arasında
3.  Koaks telsize (tuner varsa tuner'dan geçir)
4.  5m counterpoise unun toprak noktasından yere

### Boy seçimi ipuçları

Bazı uzunluklar **bazı bantlarda** çok yüksek empedans yaratır (yarım dalga katları). Bu uzunluklardan **kaçın**:

**İyi uzunluklar (m):** 7.9, 11.0, 13.1, 17.4, 21.6, 25.3, 28.0

**Kötü uzunluklar (kaçın):** 10.0, 14.2, 20.1, 28.5 (yarım dalga rezonansları)

Kötü uzunlukta tuner match edemez → SWR çok yüksek kalır.

### Tuner ayarı

1.  Düşük güç (5W) ile TX
2.  Tuner'ı ayarla → SWR <2 hedef
3.  Her bant değişiminde yeniden tune
4.  Telsiz dahili tuner (IC-7300) genelde yeter

## Performans beklentisi

Random wire **kompromis** antenidir:

### HF (3-30 MHz)

-   80m: **iyi** (tel uzunsa)
-   40m: **iyi**
-   20m: **orta-iyi**
-   10m: **orta** (tel kısa kalabilir)

### Karşılaştırma (aynı koşulda)

-   **EFHW 40m**: S9 sinyal
-   **Random wire 15m**: S7 sinyal (2 S-unit = 12 dB fark)
-   **Dipole 40m**: S9+5 sinyal

Random wire rezonant antenden **6-12 dB zayıf** — ama hiç anten olmamasından sonsuz kat iyi.

## "Long Wire" vs "Random Wire"

Terminoloji karışıklığı:

-   **Long wire** = dalga boyundan **uzun** tel (1λ+)
-   **Random wire** = dalga boyuyla **ilişkisiz** uzunluk
-   Pratikte ikisi de 9:1 unun + tuner ile çalışır
-   "Random wire" daha doğru terim (çoğu "long wire" aslında random)

## Counterpoise önemi

Random wire **dengesiz** (unbalanced) — RF akımın dönüş yolu gerek:

-   **Counterpoise yok**: koaks shield dönüş yolu olur → koaks anten gibi davranır → RFI
-   **5m counterpoise**: unun toprak noktasından yere sarkıt → RFI %80 azalır
-   **Çoklu counterpoise** (2-3 tel): daha iyi ama komplike

## Apartman random wire

Pencereden dışarı tel at → ne kadar giderse:

-   3.  kat → balkona 5m, oradan aşağı 8m = 13m tel → çoğu bant tuner ile çalışır
-   9:1 unun pencere pervazında
-   Koaks içeri, tuner telsiz yanında
-   [Apartman tutorial →](/tutorials/apartmanda-amator-telsizcilik)

## Sık sorulan sorular

### Tuner olmadan random wire çalışır mı?

**Hayır** — empedans uyumsuz, SWR 5-20:1. Telsiz koruma moduna geçer, güç vermez. Tuner zorunlu.

### En kısa random wire?

**5m minimum** — daha kısa HF'te yetersiz. 10m+ önerilir.

### Random wire vs dipole hangisi?

Dipole **her zaman daha iyi** (rezonant, dengeli, verimli). Random wire = dipole kuramadığında çözüm.

### 9:1 unun yerine 1:1 balun olur mu?

Olmaz — 1:1 balun 50Ω→50Ω, random wire 200-800Ω. 9:1 gerek.

### Çelik tel kullanabilir miyim?

Evet ama bakırdan %30-50 daha kayıplı. Bakır tercih.

* * *

## İlgili kaynaklar

-   [EFHW anten detay](/tutorials/efhw-anten-detay-pota) — rezonant alternatif
-   [Balun yapımı](/tutorials/balun-yapimi-rehberi) — 9:1 unun detay
-   [Anten tuner empedans eşleştirme](/tutorials/anten-tuner-empedans-eslestirme)
-   [Apartmanda amatör telsizcilik](/tutorials/apartmanda-amator-telsizcilik)
-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [Anten boy hesaplayıcı](/araclar/anten-hesaplayici/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — EFHW + random wire makaleleri
