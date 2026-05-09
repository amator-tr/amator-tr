---
title: 'Empedans Eşleştirme Matematiği — Smith Chart, L-Network, Stub'
description: >-
  RF empedans eşleştirme matematik temeli — kompleks empedans Z = R + jX, Smith
  Chart, L-network, stub matching, transmission line transformation.
keywords:
  - empedans
  - matching
  - Smith Chart
  - L-network
  - theory
  - math
article_section: empedans
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Smith Chart matematik bilmem zor mu?
    a: >-
      Visual tool — formül ezber gerek değil. Pratikle 1 hafta öğrenilir.
      NanoVNA otomatik gösterir.
  - q: Empedans **gerçekten** kompleks mi?
    a: >-
      Evet — AC sinyal phase shift yaratır, kapasitif/inductive yük voltaj/akım
      faz farkı = imaginary kısmı.
  - q: Matching network kayıp eder mi?
    a: >-
      Az — L (bobin) içinde wire resistance, C (kondansatör) içinde dielectric
      kayıp. Tipik 0.5-2 dB kayıp.
  - q: Wide-band matching mümkün mü?
    a: >-
      Multi-stage L-network → daha geniş bant. Ferrit balun zaten broadband (örn
      1.8-30 MHz).
  - q: Anteni rezonant tutmak mı yoksa tuner mı?
    a: >-
      Rezonant > tuner. Rezonant antene tuner gerek değil + kayıp az. Tuner
      sadece compromise (multi-band). ---
---
[NanoVNA tutorialımız](/tutorials/nanovna-anten-olcumu) Smith Chart'ı pratik kullanır. [Tuner tutorialımız](/tutorials/anten-tuner-empedans-eslestirme) tuner'ları işliyor. Bu rehber **matematik temel** — empedans nasıl hesaplanır, Smith Chart geometrisi, L-network formülleri.

## Empedans nedir?

**Z (impedance)** = AC akıma karşı toplam direnç. DC'deki "direnç"in kompleks versiyonu:

$ Z = R + jX $

-   **R** = resistance (direnç, gerçek kısım)
-   **X** = reactance (rektans, hayali kısım)
-   **j** = imaginary unit (√-1)

### Reactance türleri

-   **X > 0**: inductive (bobin gibi)
-   **X < 0**: capacitive (kondansatör gibi)
-   **X = 0**: pure resistive (rezonans)

### Pratik örnekler

-   50Ω resistor → Z = 50 + j0
-   1.6 μH bobin @ 14 MHz → Z = 0 + j140
-   100 pF kondansatör @ 14 MHz → Z = 0 - j114

## Reflection coefficient

İki empedans birleşince **yansıma**:

$ \\Gamma = \\frac{Z\_L - Z\_0}{Z\_L + Z\_0} $

-   **Z\_L** = yük empedansı (load)
-   **Z\_0** = transmission line empedans (genelde 50Ω)
-   **Γ** = reflection coefficient (kompleks sayı)

### |Γ| pratik

-   |Γ| = 0 → mükemmel match (SWR 1)
-   |Γ| = 0.33 → SWR 2
-   |Γ| = 0.5 → SWR 3
-   |Γ| = 1 → 100% yansıma (SWR ∞)

### SWR formülü

$ SWR = \\frac{1 + |\\Gamma|}{1 - |\\Gamma|} $

## Smith Chart

Empedans uzayını **dairesel grafiğe** projecte eden tool. Phillip H. Smith (1939).

### Yapı

-   **Yatay merkez line** = resistive (X = 0)
-   **Üst yarım** = inductive (X > 0)
-   **Alt yarım** = capacitive (X < 0)
-   **Sol kenar** = short circuit (Z = 0)
-   **Sağ kenar** = open circuit (Z = ∞)
-   **Merkez** = perfect match (Z = Z\_0 = 50Ω)

### Smith chart çizgileri

-   **Konstant R çizgileri** (sabit direnç) — daireler
-   **Konstant X çizgileri** (sabit reactance) — yaylar

### Kullanım

1.  Yük empedans Z\_L'yi Smith Chart'ta nokta olarak yerleştir
2.  Merkeze ne kadar uzaksa SWR o kadar yüksek
3.  Matching network ile **noktayı merkeze** taşı

## Transmission line transformation

Koaks kablonun empedansa etkisi:

$ Z\_{in} = Z\_0 \\frac{Z\_L + jZ\_0 \\tan(\\beta l)}{Z\_0 + jZ\_L \\tan(\\beta l)} $

-   **β** = phase constant
-   **l** = kablo uzunluk

### Pratik kural

**¼λ koaks** = empedans **inverter**:

-   100Ω yük + ¼λ 50Ω koaks → 25Ω görünür
-   25Ω yük + ¼λ 50Ω koaks → 100Ω görünür
-   Z\_in × Z\_L = Z\_0² (sabit)

### Pratik kullanım

-   ¼λ koaks **transformer** olarak kullan
-   100Ω anten + ¼λ 70.7Ω koaks → 50Ω match (50² = 70.7² × ... ≈ 50)
-   Bu **gamma match** yagi'lerde kullanılır

## L-network matching

İki bileşenli (L şekli) matching:

-   **Series L** + **Parallel C**
-   Veya **Series C** + **Parallel L**

### Formüller (yüksek empedans → 50Ω)

Yük: R\_L = 200Ω. Hedef: 50Ω. Frekans: 14 MHz.

```
Q = √(R_L / R_0 - 1) = √(4 - 1) = 1.73
X_L (series) = Q × R_0 = 86.5Ω
X_C (parallel) = R_L / Q = 115.6Ω

L = X_L / (2π × f) = 86.5 / (2π × 14e6) ≈ 0.98 μH
C = 1 / (2π × f × X_C) = 1 / (2π × 14e6 × 115.6) ≈ 98 pF
```

İki bileşen → R\_L 200Ω yükünü 50Ω matchıyor.

### L-network varyasyonları

-   **High-pass L**: series C + parallel L
-   **Low-pass L**: series L + parallel C
-   **High-Z input** (R\_L > R\_0): "shunt-input" topology
-   **Low-Z input** (R\_L < R\_0): "series-input" topology

## T-network ve Pi-network

Üç bileşenli matching:

### T-network

Series C + Parallel L + Series C → daha geniş range matching. **Tuner standart topology.**

### Pi-network

Parallel C + Series L + Parallel C → tüplü amplifier'larda yaygın.

### Hangi durum?

-   **L-network**: tek bant, dar range, en basit
-   **T-network**: tuner için ideal (geniş range)
-   **Pi-network**: yüksek güç tüplü amp

## Stub matching

¼λ kısa devre / açık devre koaks "stub" empedans match için:

### Single-stub match

-   Anten ↔ stub empedansı kompenzasyon
-   Yatay/dikey distance kritik
-   HF için pratik değil (uzun stub), VHF/UHF normal

### Şiş kebap formülleri

Smith Chart üzerinde geometri ile çözülür — analitik formül zor.

## Quarter-wave matching

¼λ section ile **fixed transformation**:

$ Z\_{transformer} = \\sqrt{Z\_0 \\cdot Z\_L} $

50Ω hat ↔ 100Ω yük match için: $ Z\_{transformer} = \\sqrt{50 × 100} = 70.7Ω $

70.7Ω özel koaks (RG-11) gerek. Veya iki paralel 50Ω = 25Ω, iki seri = 100Ω → 70.7Ω yakın.

### Pratik

-   Yagi gamma match
-   Folded dipole 4:1 transformation
-   ¼λ 75Ω TV kablosu (50Ω → ~112Ω)

## Bandwidth tradeoff

**Q = matching network bandwidth göstergesi**:

$ Q = \\frac{f\_0}{\\Delta f\_{3dB}} $

-   Yüksek Q → dar bant
-   Düşük Q → geniş bant
-   L-network simple → düşük Q
-   Multi-stage → yüksek Q (bant daralır)

### Pratik

-   **Anten Q düşük**: geniş bant (dipole, EFHW)
-   **Magnetic loop Q yüksek**: çok dar bant (her freq tuning gerek)
-   **Yagi Q orta**: 1-2% bandwidth

## RFI ve ferrit ile matching

Ferrit toroid'ler **broadband transformer** gibi davranır:

-   1:1 balun = 50Ω → 50Ω, dengelenmiş
-   4:1 balun = 200Ω → 50Ω
-   9:1 unun = 450Ω → 50Ω
-   49:1 EFHW unun = 2450Ω → 50Ω

Toroid sarım sayısı ratio empedans dönüşüm:

-   N₂/N₁ = √(Z₂/Z₁)
-   4:1 balun: 2:1 sarım ratio (her bir sarım kare alınır)

[Balun yapımı tutorial →](/tutorials/balun-yapimi-rehberi)

## NEC simülasyon ile empedans

[Anten radyasyon patterni](/tutorials/anten-radyasyon-pateni-nec) NEC empedansı verir:

-   Antenne geometrisi gir
-   Frekans seç
-   NEC çıktı: Z = R + jX

Bu Z'ye göre matching network tasarlanır.

## Pratik problem

Yük: Z\_L = 25 - j50 (kapasitif, low resistance). Hedef: 50Ω.

### Çözüm: L-network

1.  Smith Chart'a Z\_L noktası
2.  Merkeze (50Ω) taşı
3.  Önce X kaldır (j50 kapasitif → series inductor +j50)
4.  Sonra R düzelt (25 → 50, ¼λ transformer veya parallel)

Adım 1 sonrası: Z = 25 + j0 (pure resistive) Adım 2: ¼λ 35.4Ω transformer → 50Ω

İki adım → 50Ω match.

## Sık sorulan sorular

### Smith Chart matematik bilmem zor mu?

Visual tool — formül ezber gerek değil. Pratikle 1 hafta öğrenilir. NanoVNA otomatik gösterir.

### Empedans **gerçekten** kompleks mi?

Evet — AC sinyal phase shift yaratır, kapasitif/inductive yük voltaj/akım faz farkı = imaginary kısmı.

### Matching network kayıp eder mi?

Az — L (bobin) içinde wire resistance, C (kondansatör) içinde dielectric kayıp. Tipik 0.5-2 dB kayıp.

### Wide-band matching mümkün mü?

Multi-stage L-network → daha geniş bant. Ferrit balun zaten broadband (örn 1.8-30 MHz).

### Anteni rezonant tutmak mı yoksa tuner mı?

Rezonant > tuner. Rezonant antene tuner gerek değil + kayıp az. Tuner sadece compromise (multi-band).

* * *

## İlgili kaynaklar

-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [NanoVNA ile anten ölçümü](/tutorials/nanovna-anten-olcumu)
-   [Anten tuner empedans eşleştirme](/tutorials/anten-tuner-empedans-eslestirme)
-   [Balun yapımı](/tutorials/balun-yapimi-rehberi)
-   [Anten radyasyon patterni + NEC](/tutorials/anten-radyasyon-pateni-nec)
-   [Koaksiyel kablo seçimi](/tutorials/koaksiyel-kablo-secimi)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/)
