---
title: 'Anten Polarizasyonu — Yatay, Dikey, Çapraz, Dairesel Detayı'
description: >-
  Anten polarizasyonu detayı — yatay (horizontal), dikey (vertical), çapraz,
  dairesel (RHCP/LHCP), eliptik. Polarizasyon karşı uyumu, satellite RHCP, HF
  dipole geleneği, fading.
keywords:
  - polarizasyon
  - anten
  - dikey
  - yatay
  - dairesel
  - theory
article_section: polarizasyon
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Yatay vs dikey hangisi daha iyi?
    a: >-
      Bağlama göre: - HF DX: vertical (düşük açı) - HF NVIS / yakın: yatay alçak
      dipole - VHF röle: dikey - VHF SSB DX: yatay - Satellite: dairesel
  - q: Tek anten ile her şey" mümkün mü?
    a: >-
      Hayır. Compromise antenler (yatay + dikey 45°) çoklu polarizasyona uyum
      sağlar ama hiçbir polarizasyonda optimal değil.
  - q: Polarizasyon kaybı her zaman 20 dB mi?
    a: >-
      Teorik. Pratikte iyonosfer / multi-path / atmosferik karışıklık etkisiyle
      6-12 dB mismatch loss yaygın. Yine de önemli bir kayıp.
  - q: LHCP ve RHCP nasıl ayırt edilir?
    a: >-
      - Antene başının önünden bakıyorsun - Saatte sağ-yön (clockwise) dönerse
      RHCP - Sol (counter-clockwise) → LHCP - Helical: saat yönündeki sarım =
      RHCP
  - q: Polarized = LCD ekran polarize" gibi mi?
    a: >-
      Benzer kavram — LCD'lerin polarizing filter'i da E-field yönelimini
      kullanır. Optik polarizasyon (görünür ışık 400-800 THz) RF polarizasyonu
      (10 KHz - 3 GHz) ile aynı fizik. ---
---
İki istasyon arasında 30 dB sinyal farkı — sadece **anten polarizasyonu** uyumsuzluğundan. "Vertical anten yatay dipole'a göre çok zayıf" şikayetlerinin teknik sebebi. Bu rehber 4 polarizasyon tipi + neden hangisi nerede + pratik mismatch hesaplama.

## Polarizasyon nedir?

Elektromanyetik dalga bir **elektrik alanı** + **manyetik alanı** taşır. **Polarizasyon = E-field'in titreşim yönü.**

Anten elementi nasıl yöneliyorsa, ürettiği E-field aynı yönde olur:

-   **Yatay (horizontal)** dipole → E-field yatay
-   **Dikey (vertical)** anten → E-field dikey
-   **Çapraz (slant)** dipole → E-field 45° eğik

## 4 ana polarizasyon

### 1\. Yatay (Horizontal)

-   Dipole, yagi yatay konuşlandırılırsa
-   E-field yere paralel
-   **HF amatör radyo geleneği** — dipole'ler hep yatay
-   Avantaj: yer yansıması düşük loss, NVIS-friendly
-   Dezavantaj: yer alanı geniş (40m dipole = 20m yatay tel)

### 2\. Dikey (Vertical)

-   Vertical anten, yatay dipole dik konumlanmış
-   E-field yere dik
-   **VHF/UHF röle standartı** — Türkiye 145.6125 vs hep dikey
-   **Mobile** standartı (araba)
-   Avantaj: omnidireksiyonel, yer alanı az
-   Dezavantaj: ground plane (radyaller) gerek

### 3\. Dairesel (Circular)

-   E-field **döner** — saatte 360° tam tur
-   **Sağ-el (RHCP)** — saat yönünde dönme
-   **Sol-el (LHCP)** — saat yönü tersine
-   Helical anten, crossed yagi (90° offset 2 yagi) ile üretilir
-   **Satellite haberleşme standartı** — uydunun rotasyonu polarizasyon kayboldu, dairesel hep yakalanır

### 4\. Eliptik

-   Dairesel ile lineer arasında — biraz "eliptik" yörünge
-   Pratik ham radyo'da nadir, daha çok uzay/satellite

## Polarizasyon mismatch (cezası)

İki anten farklı polarizasyon = sinyal kaybı. **Polarization loss** matematiksel:

| TX polarizasyon | RX polarizasyon | Kayıp (dB) |
| --- | --- | --- |
| Aynı (her ikisi yatay veya her ikisi dikey) |  | 0 |
| 45° fark (yatay vs çapraz) |  | \-3 |
| 90° fark (yatay vs dikey) |  | \-20 ile -30 |
| Lineer vs dairesel |  | \-3 |
| RHCP vs LHCP |  | \-25 ile -∞ |

### Pratik etki

-   Sen yatay dipole, karşı taraf vertical → **20 dB sinyal kaybı**
-   100W → karşı taraf 1W gibi alır
-   Yine de zayıf da olsa kontak mümkün, ama optimal değil

## Hangi durumda hangisi?

### HF amatör radyo (3-30 MHz)

**Yatay dipole** standartı — geleneksel, yer alanı varsa ideal.

**Vertical** alternatif — DX'e iyi (düşük açılı yayma), apartman/balkon için pratik.

İki istasyon farklı polarizasyon ise ne olur?

-   **Day-time HF**: iyonosfer yansıması polarizasyonu **karıştırır** (Faraday rotation), kayıp daha az (~3-6 dB)
-   **Yer dalgası** (NVIS, kısa mesafe): polarizasyon korunur, mismatch 20 dB ceza
-   **Pratik**: yatay-dikey mismatch 6-12 dB tipik

### VHF/UHF röle (144/432 MHz)

**Vertical standartı**:

-   Mobile + el telsizleri vertical antenne kullanır
-   Röle antenne vertical
-   Hepsi uyumlu, kayıp yok

Yatay dipole 144.500 MHz'te röle çağırırsan ~20 dB kayıp.

### VHF/UHF SSB / CW (DX)

**Yatay** standartı:

-   Yatay yagi → düşük loss yer yansıması
-   DX uzun mesafe için ideal
-   **144.300 MHz SSB** Avrupa standartı yatay polarize

VHF/UHF dilemma: röle FM **dikey**, SSB DX **yatay** → iki anten lazım veya çevirme mekanizması.

### Satellite

**Dairesel (RHCP)** standart:

-   Uydu rotasyonu → linear polarizasyon kayboluyor
-   Dairesel polarize sürekli yakalanır
-   Helical / crossed yagi ile alınır

Eğer linear (yatay/dikey) yagi ile dinleyen, dairesel sinyal sağ-sol fading ediyor (3 dB ortalama kayıp).

### Earth-Moon-Earth (EME)

**Dairesel + lineer karışımı** — Faraday rotation Ay'da deforme eder, dairesel daha güvenilir.

## Faraday rotation

İyonosfer manyetize plazma → linear polarizasyon **döner**. Frekansa bağlı:

-   14 MHz: 30-90° rotation typical
-   28 MHz: 10-30°
-   50 MHz: küçük (<10°)
-   144 MHz: minimum (uzun yol için sadece)

**Sonuç:** HF'te polarizasyon mismatch'i iyonosfer kısmen "düzeltir" — yatay/dikey kayıp pratikte 6-12 dB değil yasal 20 dB değil.

## Multi-path fading

İki yansıma yolu farklı polarizasyon ile gelirse → kontaminasyon, fading:

-   Yatay yansıyan + dikey yansıyan combination → **destruktif interferans**
-   Sinyal seviyesi 30 dB drop saniyeler içinde
-   VHF mobile için klasik problem (binalardan yansıyan sinyal)

### Diversity reception

İki anten — yatay + dikey — receiver iki sinyal arasından **en güçlüsünü seç**. Mobile + base station'da 6 dB ortalama iyileştirme.

## Anten örnekleri

### Yatay

-   Yatay dipole
-   Yagi yere paralel kolu
-   Loop yere paralel düzlemde

### Dikey

-   Çeyrek dalga vertical
-   J-Pole (dik konumlanmış)
-   5/8 dalga vertical
-   Diamond X-30 (dual-band vertical)

### Dairesel (RHCP)

-   **Helical antenna** — sarmal, radyo amatör satellite klasik
-   **Crossed Yagi** (X-Yagi) — iki yagi 90° offset birbirinde, faz 90° gecikmiş

### Eğik (slant)

-   45° dipole — kompromi
-   Slant-V — V şeklinde yatay-dikey karışımı

## Polarizasyon değiştirme (rotator)

Yagi'i mekanik olarak çevirebilirsin:

-   **Azimuth rotator** — yön değişimi (0-360°)
-   **Elevation rotator** — açı değişimi (0-90°)
-   **Polarization rotator** — yatay ↔ dikey 90° çevirme

Pahalı (~$500) ama profesyonel istasyon için pratik.

## CP polarizasyon ölçme (NEC)

NEC simülasyon yazılımları (4nec2, MMANA-GAL):

-   Anten geometrisini gir
-   Far-field pattern hesapla
-   **Axial ratio** (AR) — dairesel polarizasyonun "ne kadar dairesel"
    -   AR = 0 dB → mükemmel dairesel
    -   AR = 3 dB → eliptik
    -   AR > 6 dB → linear

## Pratik ipuçları

### Dipole yön

Yatay dipole'ün **maksimum yayma deseni** dipole'a dik. Eğer çok DX yapacaksan dipole'u DX yönüne dik kur.

### Vertical multi-path

Vertical antenne urban environment'ta multi-path bozar. **5+ metre yükseklik** ile zemin yansımasını minimize.

### Cross-polarization isolation

Crossed dipole (yatay + dikey) ile aynı frekansta TX yapsan **20 dB izolasyon** — full duplex (TX-RX aynı frekansta) deneyleri için.

### Polarizasyon 45° kompromi

Eğer mobile + base station karıştırıyorsan, 45° eğik anten 3 dB her iki polarizasyona — adil kompromi.

## Sık sorulan sorular

### Yatay vs dikey hangisi daha iyi?

Bağlama göre:

-   HF DX: vertical (düşük açı)
-   HF NVIS / yakın: yatay alçak dipole
-   VHF röle: dikey
-   VHF SSB DX: yatay
-   Satellite: dairesel

### "Tek anten ile her şey" mümkün mü?

Hayır. Compromise antenler (yatay + dikey 45°) çoklu polarizasyona uyum sağlar ama hiçbir polarizasyonda **optimal** değil.

### Polarizasyon kaybı her zaman 20 dB mi?

Teorik. Pratikte iyonosfer / multi-path / atmosferik karışıklık etkisiyle **6-12 dB** mismatch loss yaygın. Yine de önemli bir kayıp.

### LHCP ve RHCP nasıl ayırt edilir?

-   Antene başının önünden bakıyorsun
-   Saatte sağ-yön (clockwise) dönerse RHCP
-   Sol (counter-clockwise) → LHCP
-   Helical: saat yönündeki sarım = RHCP

### "Polarized = LCD ekran polarize" gibi mi?

Benzer kavram — LCD'lerin polarizing filter'i da E-field yönelimini kullanır. Optik polarizasyon (görünür ışık 400-800 THz) RF polarizasyonu (10 KHz - 3 GHz) ile aynı fizik.

* * *

## İlgili kaynaklar

-   [Anten yapımı temel](/tutorials/anten-yapimi-temel)
-   [Vertical anten detay](/tutorials/dikey-vertical-anten-detay)
-   [Yagi anten yapımı](/tutorials/yagi-anten-yapimi)
-   [Satellite haberleşme](/tutorials/satellite-haberlesme-leo-amsat) — RHCP standart
-   [HF propagasyon](/tutorials/hf-propagasyon-temelleri) — Faraday rotation
-   [dB/dBi/dBd anten kazancı](/tutorials/db-dbi-dbd-anten-kazanci)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — anten polarizasyonu
