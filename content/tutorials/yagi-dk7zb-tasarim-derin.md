---
title: DK7ZB Yagi Tasarımı — Düşük Empedansa 50Ω Direkt Match
description: >-
  Martin Steyer (DK7ZB) Yagi tasarımı — 50Ω direkt match (gamma/balun gerekmez),
  geniş bant, robust. 3-element 7 dBd, 5-element 9 dBd, 7-element 11 dBd.
keywords:
  - Yagi
  - DK7ZB
  - anten
  - beam
  - 50 ohm
  - DIY
article_section: Yagi
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: DK7ZB Yagi gain'i klasikten daha iyi mi?
    a: Aynı element sayısı için aynı gain. Avantajı basit + robust + geniş bant.
  - q: 50Ω direkt nasıl elde edilir?
    a: >-
      DK7ZB element boyutları matematik optimize → driven element direkt 50Ω
      görünür.
  - q: Klasik Yagi'yi DK7ZB'a çevirmek mümkün mü?
    a: >-
      Evet — element boyutlarını DK7ZB tablosuna göre kes. Boom + spacing
      değişebilir.
  - q: Tasarım nereden bulunur?
    a: >-
      DK7ZB website — frekanslara göre 30+ tasarım, NEC dosyaları (4nec2 /
      MMANA-GAL).
  - q: Türkiye'de DK7ZB Yagi yaygın mı?
    a: >-
      VHF/UHF DX'çiler arasında popüler. Sahil bölgelerinde tropo için yapılır.
      ---
---
[Yagi anten tutorialımız](/tutorials/yagi-anten-yapimi) klasik Yagi tasarımını işliyor. Bu rehber **DK7ZB design** — Alman amatör Martin Steyer'in (DK7ZB) ünlü yagi tasarımı. **Direkt 50Ω match** (gamma match yok), kolay yapım, robust performans.

## DK7ZB tasarımının farkı

### Klasik Yagi sorunu

-   Driven element ½λ dipole
-   Empedans **35Ω civarı** (parazitlerin etkisi)
-   50Ω koaksla matching gerek (gamma match, T-match, beta match)
-   Karmaşık, tunning hassas

### DK7ZB çözümü

-   Driven element **özel boyut** (folded değil, normal dipole ama strategic length)
-   Direkt 50Ω empedans
-   **Match yok** — direkt koaks!
-   Geniş bant (2-3 MHz BW @ 144 MHz)

## DK7ZB optimization

Martin Steyer NEC simülasyon ile **driven element + boom + element spacing** optimize:

-   Element çapı dahil hesaba
-   Boom material (alu vs metal) tolerans
-   Yer yüksekliği etkileri

Tasarımlar **boyut tablo** olarak yayınlandı, internet siteleri [www.qsl.net/dk7zb/](http://www.qsl.net/dk7zb/) çoklu Yagi tasarımları sunar.

## En popüler DK7ZB tasarımlar

### 3-element 144 MHz (2m)

-   Boom: 1.04m
-   Driven: 988 mm
-   Reflector: 1042 mm
-   Director 1: 928 mm
-   Element spacing: R-D 200mm, D-D1 800mm
-   **Gain: 7.0 dBd (9.15 dBi)**

### 5-element 144 MHz

-   Boom: 2.65m
-   5 element çift kez optimize
-   **Gain: 9.0 dBd (11.15 dBi)**
-   F/B: 22 dB

### 7-element 432 MHz (70cm)

-   Boom: 1.40m
-   7 element compact
-   **Gain: 11 dBd**
-   70cm DX için altın çağ

### 8-element 144 MHz

-   Boom: 5.5m
-   "Long Yagi" — premium DX
-   **Gain: 11 dBd**, F/B 25 dB

## Malzeme

### Element

-   8 mm aluminum boru (tubing)
-   Veya 6 mm bakır boru
-   Kesin uzunluk **kritik** — ±2 mm tolerans

### Boom

-   20×20 mm aluminum kare profil
-   Veya 25 mm yuvarlak boru
-   Element izolasyonu shart

### Element-boom izolasyon

-   **Plastic insulator** — element aluminum boom'u şort etmesin
-   Üreten: Nibblers, ProSistel, DXEngineering
-   DIY: PVC tüp parça

### Konnektör

-   **Direkt 50Ω** match → SO-239 driven element merkezinde
-   Choke: 1:1 current balun (CMC bastırma)

## Yapım adım adım (3-element 2m)

### Adım 1: Boom hazırla

-   1.04m alu boru / kare profil
-   4 element delik:
    -   0 cm: reflector
    -   20 cm: driven
    -   100 cm: director (boom tipik 1.04m, kalan 4 cm)

### Adım 2: Element kes

-   Reflector: 1042 mm (her bir kanat 521 mm)
-   Driven: 988 mm (her bir kanat 494 mm)
-   Director 1: 928 mm

### Adım 3: Element izolasyon

-   Boom delikten plastic insulator yerleştir
-   Element bu insulator içinden geçirip ortala

### Adım 4: Driven element feed

-   İki yarısı **central insulator** ile ayır
-   SO-239 chassis mount central
-   Her yarı SO-239 lehim
-   Hazır!

### Adım 5: 1:1 balun

-   FT-240-43 ferrit, 8 sarım koaks
-   Driven element boomda
-   CMC bastırma

### Adım 6: SWR test

-   NanoVNA: 144-148 MHz sweep
-   SWR < 1.5 olmalı tüm bantta
-   Eğer offset varsa: driven element boyu **±5 mm** ayarla

## Performans karşılaştırma

DK7ZB 3-element vs **klasik 3-element + gamma match**:

|  | DK7ZB | Klasik gamma |
| --- | --- | --- |
| Gain | 7.0 dBd | 7.0 dBd |
| F/B | 18 dB | 15 dB |
| Bandwidth (SWR<2) | 4 MHz | 1.5 MHz |
| Match karmaşıklığı | Yok | Gamma capacitor + tube |
| Yapım kolaylığı | ✓ ✓ ✓ | ✓ |
| Mekanik robustness | ✓ ✓ ✓ | ✓ ✓ |

**DK7ZB daha geniş bant + daha basit yapım** — "best of both worlds".

## Mounting

### Beam mast

-   50 mm çelik direk
-   5-15m yükseklik (boom üstünde)
-   Yıldırım koruma (lightning arrestor)

### Rotator

-   **Yaesu G-450A** (~$400) — orta yagi
-   **Hy-Gain Ham V** (~$600) — premium
-   Manuel rotasyon DC motor + relay

### Polarizasyon

-   **Yatay** — tipik HF/VHF DX standart
-   **Çapraz** — uydu / EME için (RHCP)
-   DK7ZB tasarımları yatay olarak design edilmiş

## DX performansı

### 144 MHz DK7ZB Yagi

-   Tropo: 500-1500 km (sahil bölgesinde)
-   Sporadic E: 1500-2500 km
-   Meteor scatter: 800-2000 km
-   EME: imkansız (yetersiz gain), 8+ element + 1500W gerek

### 432 MHz DK7ZB Yagi

-   Tropo: 200-1000 km
-   EME: 11 dBd zorlu ama mümkün (1500W + iyi koşul)

## Multi-Yagi stack

İki Yagi paralel = **+3 dB** gain:

-   2× 3-element = 10 dBd
-   4× 3-element = 13 dBd
-   DK7ZB tasarımları **stack için ideal** — uniform empedans

### Phasing line

-   ½λ koaks paralel feed
-   Yatay 1λ aralık (her iki Yagi)
-   Yine 50Ω match

## Sık yapılan hatalar

### 1\. Element kesim hata ±5mm

Tolerans ±2mm. 5 mm yanlış = SWR 2.5 (kritik bant kenarında).

### 2\. Element-boom kontak

Insulator yokluğu → element boom'a kısa devre → DC short, RF zayıf.

### 3\. Yanlış DK7ZB versiyonu

İnternet'te birçok DK7ZB tasarım — yanlış frekans (144 MHz tasarımını 145.500 MHz için optimize değil).

### 4\. Boom çok uzun

Direk 5m boom çoklu element = gain artar ama mekanik zayıf, rüzgar zarar.

### 5\. CMC bastırma yok

1:1 balun **şart**. Yoksa pattern bozuk + RFI.

## Sık sorulan sorular

### DK7ZB Yagi gain'i klasikten daha iyi mi?

Aynı element sayısı için **aynı gain**. Avantajı **basit + robust + geniş bant**.

### 50Ω direkt nasıl elde edilir?

DK7ZB element boyutları matematik optimize → driven element direkt 50Ω görünür.

### Klasik Yagi'yi DK7ZB'a çevirmek mümkün mü?

Evet — element boyutlarını DK7ZB tablosuna göre kes. Boom + spacing değişebilir.

### Tasarım nereden bulunur?

[DK7ZB website](http://www.qsl.net/dk7zb/) — frekanslara göre 30+ tasarım, NEC dosyaları (4nec2 / MMANA-GAL).

### Türkiye'de DK7ZB Yagi yaygın mı?

VHF/UHF DX'çiler arasında popüler. Sahil bölgelerinde tropo için yapılır.

* * *

## İlgili kaynaklar

-   [Yagi anten yapımı temel](/tutorials/yagi-anten-yapimi)
-   [Anten yapımı temel](/tutorials/anten-yapimi-temel)
-   [Anten radyasyon patterni + NEC](/tutorials/anten-radyasyon-pateni-nec)
-   [dB/dBi/dBd kazanç](/tutorials/db-dbi-dbd-anten-kazanci)
-   [Egzotik propagasyon](/tutorials/meteor-scatter-eme-egzotik) — VHF DX
-   [Balun yapımı](/tutorials/balun-yapimi-rehberi)
-   DK7ZB website: [qsl.net/dk7zb](http://www.qsl.net/dk7zb/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/)
