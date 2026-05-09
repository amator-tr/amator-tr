---
title: Slim Jim Anten Detaylı Yapımı — Apartman Dostu VHF Antenni
description: >-
  Slim Jim 2m anten DIY rehberi — 300Ω ladder line ile yapım, J-Pole
  karşılaştırma, gain pattern, balkon montajı, ayar prosedürü.
keywords:
  - Slim Jim
  - J-Pole
  - anten
  - VHF
  - 2m
  - DIY
  - apartman
article_section: Slim Jim
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Slim Jim 70cm bandında çalışır mı?
    a: >-
      Tek bant tasarım — 2m için. 70cm için ayrı Slim Jim yapılabilir (boyut
      yarısı).
  - q: 300Ω twin-lead nereden alınır?
    a: >-
      Eski TV antenne malzemesi. Bulunmazsa 450Ω ladder line alternatif
      (boyutlar değişir).
  - q: Tek başına vertical Diamond X-30 yerine Slim Jim?
    a: >-
      - Diamond X-30 (~2K TL): hazır, dual-band, 6 dBi - DIY Slim Jim (~50 TL):
      yapım keyfi, 2.5 dBi, sadece 2m DIY sadece iyi, ucuz değil. Hazır vertical
      performans daha iyi 2K TL bütçen varsa.
  - q: Yağmur etkisi?
    a: >-
      PVC tüp içinde olduğu sürece mukavim. Slim Jim tek başına twin-lead direkt
      yağmurda zarar görür. ---
---
[Anten yapımı temel tutorialımız](/tutorials/anten-yapimi-temel) Slim Jim'i kısaca işliyor. Bu rehber **detaylı Slim Jim** — 300Ω twin-lead ile yapım, ölçü, ayar.

## Slim Jim nedir?

J-Pole'un evrimleşmiş versiyonu. **Tam yarım dalga aktif** anten + matching stub. 2m bandında popüler, balkon dostu.

### Tarih

F.J. Judd (G2BCX) 1979'da geliştirdi. "Slim **J**\-i**m**ply" = ince + basit.

### J-Pole vs Slim Jim

|  | J-Pole | Slim Jim |
| --- | --- | --- |
| Aktif radyator | ½λ | Full λ (folded) |
| Matching stub | ¼λ | ¼λ |
| Toplam boy | ¾λ | ½λ + ¼λ |
| Gain | 0 dBi | ~2.5 dBi |
| Pattern | Omni | Omni daha iyi |

Slim Jim **daha küçük tepe** + biraz daha gain.

## Boyut hesabı

2m bandı için (145 MHz):

### 300Ω twin-lead ile

-   Total height: **1.50 m**
-   Folded section (top): **97 cm** (0.47λ)
-   Stub section (bottom): **49 cm** (0.24λ)
-   Slot (gap top): 1.5 cm
-   Slot (gap bottom): 1.5 cm
-   Feed point: 5-15 cm yukarıda stub tabanından (ayar)

### Velocity factor

300Ω twin-lead VF ~0.85 → fiziksel ölçü vs elektrik dalga boyu.

## Malzeme

### 300Ω twin-lead (ana malzeme)

-   TV antenne için kullanılır (eski analog)
-   Hafif, esnek, ucuz (~5 TL/m)
-   2m'lik tek parça yeter

### Konnektör

-   1× SO-239 chassis mount
-   1× PL-259 (telsiz tarafı koaksta)

### Yapısal

-   PVC tüp ~2m (anteni dik tutmak için)
-   Plastik kelepçe / cable tie

## Yapım adım adım

### Adım 1: Twin-lead kes

-   1.5m + 5cm marj
-   İki paralel iletken: A (sol), B (sağ)

### Adım 2: Slot kesme

-   Üst kenardan 1.5 cm aşağı, **A iletkenini** kes (B sürekli)
-   Bu noktanın **97 cm aşağısında**, **B iletkenini** kes (A sürekli)
-   İki "slot" oluşturuyoruz

### Adım 3: Alt köprü

-   En alt kenarda iki iletken **birbirine bağla** (lehim)

### Adım 4: Feed point

-   Alt köprünün ~10 cm üstünde, koaks shield'i bir iletkene
-   Center conductor diğer iletkene
-   Lehim + sağlam

### Adım 5: PVC + montaj

-   Tüm anteni PVC tüpün içine yerleştir (esneklik için)
-   PVC tüpe plastik clamp ile balkona, çatıya bağla

### Adım 6: SWR test

-   NanoVNA veya SWR meter
-   Feed point pozisyonunu **5 cm aşağı / yukarı** kaydır
-   SWR < 1.5 hedef

## Ayar (fine-tune)

Feed point pozisyonu kritik:

-   Çok aşağıda → SWR yüksek, low impedance
-   Çok yukarıda → SWR yüksek, high impedance
-   Orta nokta → 50Ω match

Pratik:

1.  Feed point: stub tabanından 10 cm
2.  SWR test
3.  ±5 cm ayarla, SWR azalan yönde devam
4.  Optimum 5 cm increment'leri

## Performans

### Gain

-   Yatay tepede 2.5 dBi
-   Yatay yan loblar -10 dB
-   F/B yok (omnidireksiyonel)

### Pattern

-   Yatay düzlemde elips (J-Pole'dan biraz daha düz)
-   Maksimum yayma horizon (düşük açı), DX iyi
-   NVIS değil

### Bant genişliği

-   144-148 MHz (2m amatör)
-   SWR < 2 tüm bantta tipik

## Apartman montajı

### Balkon monte

1.  **Direksek dikme** PVC tüp 2.5m
2.  Slim Jim PVC tüp içinde
3.  Dirseği balkon parmaklığına metal clamp
4.  Dik durmasını sağla (3 telli destek)

### Çatı monte (varsa)

1.  **Direk** çatıya antenne 3-4m üstünde
2.  Slim Jim direğin tepesinde
3.  Toprak bağlantı (statik / yıldırım)

### Balkon altı (gizli)

-   Köşede gizli, dış yüzeyde değil
-   Vertical metal sürpriz kelep balkonun yan tarafına
-   Yönetim onay gerek değil çünkü görünmez

## Slim Jim vs J-Pole hangi durumda?

### Slim Jim tercih

-   Hafif setup
-   Apartman / balkon
-   Daha düşük profil görünüm
-   2m + 70cm dual-band imkansız (sadece 2m)

### J-Pole tercih

-   Sabit istasyon
-   Daha robust mekanik (cooper boru)
-   Dual-band tasarım mümkün

## Sık yapılan hatalar

### 1\. Slot positioning yanlış

Slot 97 cm + 49 cm = 146 cm. Yanlış ölçüm → SWR berbat.

### 2\. Twin-lead bozuk

Eski TV antenne'den çıkardığın twin-lead nem girmiş olabilir → kayıp yüksek.

### 3\. Feed point ayarlamadan kullanma

Direkt monte etme + ayar sonra → SWR 5:1, telsiz protect mode.

### 4\. Yatay monte

Slim Jim **dikey** çalışır. Yatay monte = polarizasyon yanlış + pattern bozuk.

### 5\. Yer yakın

Direkten 5m yer altında → yer etkisi pattern bozar. **PVC tüp + 2m yükseklik** minimum.

## Test sonuçları (örnek)

145.500 MHz, balkon Slim Jim, 5W el telsizi:

-   50 km menzil röleye sürekli kontak
-   Yakın istasyon S9 sinyal
-   DX yapamaz (line-of-sight VHF)

## Sık sorulan sorular

### Slim Jim 70cm bandında çalışır mı?

Tek bant tasarım — 2m için. 70cm için ayrı Slim Jim yapılabilir (boyut yarısı).

### 300Ω twin-lead nereden alınır?

Eski TV antenne malzemesi. Bulunmazsa **450Ω ladder line** alternatif (boyutlar değişir).

### Tek başına vertical Diamond X-30 yerine Slim Jim?

-   **Diamond X-30** (~2K TL): hazır, dual-band, 6 dBi
-   **DIY Slim Jim** (~50 TL): yapım keyfi, 2.5 dBi, sadece 2m

DIY sadece **iyi**, ucuz değil. Hazır vertical performans daha iyi 2K TL bütçen varsa.

### Yağmur etkisi?

PVC tüp içinde olduğu sürece mukavim. Slim Jim tek başına twin-lead direkt yağmurda zarar görür.

* * *

## İlgili kaynaklar

-   [Anten yapımı temel](/tutorials/anten-yapimi-temel) — J-Pole + Slim Jim temel
-   [Vertical anten detay](/tutorials/dikey-vertical-anten-detay)
-   [Apartmanda amatör telsizcilik](/tutorials/apartmanda-amator-telsizcilik)
-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [Anten boy hesaplayıcı](/araclar/anten-hesaplayici/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/)
