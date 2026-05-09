---
title: 'Dikey (Vertical) Anten Detaylı Rehber — Radyaller, Multi-Band, GP'
description: >-
  Vertical anten tasarımı + ground plane radyalleri, multi-band vertical
  (Hustler 6BTV, Hy-Gain AV-640), DX vertical, monoband çeyrek dalga vs 5/8
  dalga, NEC simülasyon ipuçları.
keywords:
  - vertical
  - anten
  - radyal
  - ground plane
  - çeyrek dalga
  - HF
article_section: vertical
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Çatıya vertical kurabilir miyim?
    a: >-
      Evet ama radyalleri çatıda gerilmeli. Beton çatı kötü iletken → 8+ radyal,
      her biri λ/4. Çatı kenarından sarkıt zorlaşır.
  - q: Vertical için en iyi bant?
    a: >-
      40m + 20m kombinasyonu — en aktif HF bantları + vertical'ın güçlü olduğu
      DX bantları.
  - q: Tek radyalle vertical olur mu?
    a: >-
      "Sloper" denir — 1 radyal anten kadar uzun, eğik aşağıya. Performans 4
      radyaldan zayıf ama kompakt.
  - q: Saltwater radial" nedir?
    a: >-
      Sahil hattında deniz suyuna kısmen daldırılmış metal radyal. Doğal deniz
      suyuyla mükemmel ground.
  - q: NEC simülasyon nasıl yaparım?
    a: >-
      4nec2 ücretsiz Windows yazılımı — anten geometrisini gir, gain/pattern/SWR
      simulate et. Steep learning curve. ---
---
Vertical anten = amatör radyonun "her zaman çalışan" antenni. Yatay yer alanı az, omnidireksiyonel, düşük açılı yayma → DX'e ideal. **Ama** ground plane (radyal sistemi) iyi olmazsa fiyaskoya dönüşür. Bu rehber vertical antenlerin fiziği + radyal yerleşim + multi-band + sahil DX vertical karşılaştırma.

## Vertical anten fiziği

Vertical = topraktan dik yükselen iletken. Çeşitleri:

### Çeyrek dalga (¼λ, 90°)

-   Boyu: λ/4 (40m bandında 10m, 20m'de 5m, 2m'de 50cm)
-   Yer "ground plane" (radyal sistemi) ile birleşince yarım dalga gibi davranır
-   En yaygın amatör vertical
-   Empedans: ~36Ω (ideal), 4 radyalle 50Ω'a yakın

### Yarım dalga (½λ)

-   Boyu: λ/2 (40m'de 20m — bu çok büyük!)
-   Topraklama gerek **yok**
-   Vertical olarak nadir, end-fed olarak yaygın
-   Yüksek empedans (2000-5000Ω) → 49:1 unun gerekir

### 5/8 dalga

-   Boyu: 5λ/8 (40m'de 12.5m)
-   Daha düşük yayma açısı → DX'e iyi
-   Loading coil (matching network) gerekir
-   VHF mobile antenne yaygın (1-1.5m boyu)

## Ground plane (radyal sistemi)

Çeyrek dalga vertical'in en kritik kısmı. Yer = "diğer yarısı":

### Vertical sadece bir yarı

-   Anten 1/4 dalga
-   Yer onun aynalı imajını oluşturur → tam dipole gibi
-   Yansıma için "iyi iletken yer" lazım

### Doğal yer

-   **İdeal**: deniz suyu — mükemmel iletken (sahile yakın istasyonların DX şampiyonluğu)
-   **İyi**: nemli toprak (tarım arazisi, sulu)
-   **Orta**: kuru toprak (asfalt yola ortaya yakın)
-   **Kötü**: kayalık, kuru kum, kar üstü
-   **Berbat**: çatı (beton, asfalt) → büyük kayıp

### Radyaller (yapay ground plane)

Yer iletken değilse **radyal sistemi** ekle — anten tabanından dışa doğru çekilen tel/iletken sistem.

#### Radyal sayısı (rule of thumb)

-   **2 radyal**: minimum, %50 verim kayıp
-   **4 radyal**: tipik HF vertical, %70 verim
-   **8 radyal**: çok iyi, %85 verim
-   **16 radyal**: profesyonel, %92 verim
-   **60+ radyal**: broadcast tower, %98 verim

#### Radyal uzunluğu

-   **Yer üstü (üzerinde gerilen tel)**: λ/4 uzunlukta (anten kadar) ve resonant
-   **Yer altı (gömülü)**: λ/4 yeter, daha uzun olabilir (DX vs çoklu sayı)
-   **Sayı > uzunluk** — 8 kısa radyal, 4 uzun radyaldan daha iyi

#### Radyal kalınlığı

-   AWG 14-18 emaye bakır tel ucuz, fonksiyonel
-   100m'lik bobinde 50-100 TL
-   Çelik tel ucuz ama paslanır

#### Radyal yerleşim

-   Vertical tabanında **eşit açıyla** dağıtılmış (4 radyal = 90° aralık)
-   Yer üstü: 5-30 cm yüksekte gerilmiş — yere paralel
-   Yer altı: 5-15 cm derinlikte gömülü, çiçek yatağı için ideal
-   Birbirine değmesin — kısa devre olmasın

## Hazır model karşılaştırma

### Hustler 6BTV (~$300)

-   Çoklu trap design (loading coils)
-   80, 40, 30, 20, 15, 10m bantları
-   Boyu 7.3m
-   4 radyal kit dahil değil, ayrı satılır
-   ~30 yıllık dizayn, kanıtlanmış

### Hy-Gain AV-640 (~$500)

-   6, 10, 12, 15, 17, 20, 30, 40m
-   7.3m boyu
-   Yer üstü monte için tasarlanmış (radyal gerek yok!)
-   Premium fiyat, premium kalite

### Cushcraft R-8 (~$700)

-   Multi-band 40-6m
-   Trap-less design — daha geniş bant
-   8.5m boyu, ekstra strong winds için

### Diamond CP-6 (~$300)

-   6, 10, 12, 15, 20, 40m
-   Compact (6m boyu)
-   Apartman balkonu için ideal

### MFJ-1798 (~$250)

-   80-2m all-band
-   12m boyu
-   Trap design
-   Çok fiyat-performans

### DIY vertical (~$50-150)

-   Aluminum boru (irrigation veya conduit)
-   AWG-12 kalın tel radyal
-   PL-259 connector taban
-   Maliyet ucuz, performans yine iyi

## Vertical vs Dipole karşılaştırma

| Kriter | Vertical | Dipole |
| --- | --- | --- |
| **Yer alanı** | 1m² (radyallerle 5m²) | 20-40m teli yatay |
| **Gain** | ~0 dBi (radyallerle) | 2.15 dBi |
| **Pattern** | Omnidireksiyonel | 8 şekli (yan loblar) |
| **Yayma açısı** | Düşük (5-30°) | Yüksek (30-90° NVIS) |
| **DX'e uygunluk** | Çok iyi | İyi (yüksek dipole) |
| **Yakın menzil (NVIS)** | Zayıf | Mükemmel (alçak) |
| **Kurulum karmaşası** | Radyaller + direk | İki ağaç + tel |
| **Görünürlük** | Az (dik) | Çok (yatay) |

### Hangisi daha iyi?

**Bağlamına göre.** DX hedefi → vertical. Yakın menzil / EmComm → dipole. Apartman → magnetic loop.

## Empedans matching

Çeyrek dalga vertical'in empedansı **36Ω** (4 sonsuz radyal varsayarak).

### Matching seçenekleri

-   **Direkt 50Ω koaks** — SWR ~1.4 → çoğu telsiz tolere
-   **Hairpin match** (impedance transformer) → 50Ω'a tam
-   **Gamma match** — vertical antenne yaygın
-   **Beta match** — alternatif

Çoğu hazır vertical (Hustler, Hy-Gain) gamma veya direct match ile gelir, kurulum kolay.

### Tuner

Multi-band vertical (one antenna, multiple bands) genelde tuner ister. Telsiz dahili antenne tuner (FT-991A, IC-7300) yeterli — SWR 3:1'e kadar match eder.

## Topraklama

Vertical antenler güvenlik açısından **yere bağlanmalı**:

-   Statik electricity drain (rüzgar, fırtına)
-   Yıldırım (anten yıldırım çekiyor!)
-   RF safety

### Toprak çubuğu

-   Galvanized steel rod, 2m derin
-   Anten tabanına **kalın bakır tel** (AWG 6+) ile bağla
-   1m mesafede ev şebeke ground'una bağlı
-   Lightning arrestor koaks hattına

[RF güvenliği](/tutorials/rf-guvenligi-ve-saglik) detay.

## DX'te vertical neden çalışıyor?

Düşük yayma açısı = uzun mesafeli single-hop'lara ideal.

### Vertical pattern (NEC simulation)

-   Maks yayma: 5-15° elevation (ufukta dama)
-   Düşük açıda iyonosfere giriş → uzun skip
-   Bu yüzden sahil vertical = legendary DX antenni

### Yatay dipole alçak

-   Maks yayma: 60-90° (yukarı, NVIS)
-   Yakın mesafe iyi, uzak DX zayıf

### Yüksek dipole (>0.5λ)

-   Maks yayma: 20-30° (orta)
-   Hem yakın hem uzak orta düzeyde

Sonuç: **vertical = uzun mesafe, yatay alçak = yakın, yatay yüksek = orta**.

## Pratik kurulum (40m monoband)

### Malzeme

-   10m alüminyum boru/conduit (yapı malzemesi mağaza)
-   4 × 10m AWG-14 emaye bakır tel (radyal)
-   1 × PL-259 chassis mount
-   1 × FT-240-43 ferrit (1:1 choke)
-   M6 cıvata + somun + lehim malzeme

### Maliyet: ~600 TL

### Adım adım

1.  **Direk hazırla** — 10m alüminyum dik kur (toprağa kazık + destekler)
2.  **Taban montaj** — PL-259 plastik tabanına vidala, koaksla bağla
3.  **Anten boru lehim** — anten elemanını PL-259 inner pin'e
4.  **Radyal sistemi** — 4 radyal 90° aralıklı ground'a (PL-259 outer)
5.  **Choke** — koaksta 8 sarım ferrit
6.  **Test** — NanoVNA: 7.0-7.3 MHz aralığında SWR < 2

### İlk SWR yüksekse

-   Anten boyunu **2-5 cm** kes (resonansı yukarı taşır)
-   Veya boy kısaysa coil ekle (loading)

## Sahil DX (saltwater) bonus

Antenize sahile koymak istiyorsan: **deniz suyu = mükemmel ground**:

-   Vertical sahilde radyalsiz bile çalışır (deniz suyu radyal görevi)
-   30-40 dB DX avantajı
-   Türkiye sahil amatörleri (TA1, TA8 prefiksleri) DX listesinde tepelerde

## Sık sorulan sorular

### Çatıya vertical kurabilir miyim?

Evet ama radyalleri çatıda gerilmeli. Beton çatı kötü iletken → 8+ radyal, her biri λ/4. Çatı kenarından sarkıt zorlaşır.

### Vertical için en iyi bant?

40m + 20m kombinasyonu — en aktif HF bantları + vertical'ın güçlü olduğu DX bantları.

### Tek radyalle vertical olur mu?

"Sloper" denir — 1 radyal anten kadar uzun, eğik aşağıya. Performans 4 radyaldan zayıf ama kompakt.

### "Saltwater radial" nedir?

Sahil hattında deniz suyuna kısmen daldırılmış metal radyal. Doğal deniz suyuyla mükemmel ground.

### NEC simülasyon nasıl yaparım?

[4nec2](https://www.qsl.net/4nec2/) ücretsiz Windows yazılımı — anten geometrisini gir, gain/pattern/SWR simulate et. Steep learning curve.

* * *

## İlgili kaynaklar

-   [HF dipole + EFHW anten](/tutorials/hf-dipole-efhw-anten)
-   [Anten yapımı temel](/tutorials/anten-yapimi-temel)
-   [Magnetic loop anten yapımı](/tutorials/magnetic-loop-anten-yapimi)
-   [Balun yapımı](/tutorials/balun-yapimi-rehberi)
-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [Anten boy hesaplayıcı](/araclar/anten-hesaplayici/)
-   [NanoVNA ile ölçüm](/tutorials/nanovna-anten-olcumu)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — vertical anten makaleleri
