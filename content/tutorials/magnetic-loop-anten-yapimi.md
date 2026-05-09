---
title: Magnetic Loop Anten Yapımı — Apartman ve Stealth Operasyon İçin
description: >-
  Manyetik loop anten DIY rehberi. Bakır boru çapı, vacuum capacitor, coupling,
  SWR ayarı. Hazır model fiyatları (MFJ-1786, Alpha, Chameleon) ve kendin yap
  maliyeti.
keywords:
  - magnetic loop
  - anten
  - apartman
  - DIY
  - HF
article_section: magnetic loop
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: 5W ile dünya çapında DX yapılır mı?
    a: >-
      Evet, FT8 ile. -20 dB SNR decode'u küçük antenlerin verim düşüşünü tolere
      eder. Magnetic loop + 5W FT8 = Avustralya / Brezilya kontak yaygın.
  - q: 'Loop''un çevresi olsun mu, çapı olsun mu önemli?'
    a: Çevre = π × çap. 1m çap = 3.14m çevre. Hesaplarda çevre kullanılır.
  - q: Çelik ya da alüminyum loop?
    a: >-
      Bakır > alüminyum > çelik (iletkenlik açısından). Bakır en yüksek Q, en
      yüksek verim. Çelik 50% kayıp.
  - q: Ev içi sahil mi mıknatıslı?
    a: >-
      Hayır karışıklık yok — magnetic field'i sıradan mıknatıslı malzemelerle
      etkilenmez (frekans çok yüksek). Demir parçası loop yakınında olsa bile
      etki sınırlı. ---
---
Apartmanın dar, çatın yok, anten için 2 metrelik dar bir balkonun var. Klasik dipole 40m HF için 20m yer ister — sende 1.5 metre. **Manyetik loop anten** bu durumda mucizedir: 1m çapında bir bakır halka, 80m'den 10m'ye HF kontak. Bu rehber DIY yapımı + hazır model karşılaştırması.

## Magnetic loop nedir?

Standart antenler **elektrik alanı** dominant — uzaktaki alıcıya elektromanyetik dalga gönderir, ama yakın çevredeki RF tıkanıklığı yapar (komşunun TV, Wi-Fi, mikrofon).

**Magnetic loop** ise **manyetik alan** dominant. Yakın alanda elektromanyetik gürültü çok az → komşu RFI minimum. Operatör için ek avantaj: gürültülü şehir ortamında (motor, neon, plasma TV) **3-10 dB daha sessiz alıcı**.

Yapı basit: kapalı bir bakır halka (loop) + ayar kondansatörü. Belirli frekansta rezonansa girer, dar bantlı.

## Avantajlar / dezavantajlar

### ✅ Artılar

-   **Çok küçük** — 1m çapında loop 80m'den 15m'ye çalışır
-   **İçeride kullanılabilir** — oturma odası, çatı arası, balkon
-   **Düşük gürültü** — manyetik dominant
-   **Yön ayarlanabilir** — loop'u döndürürsen polarizasyon değişir, fading'e karşı esnek
-   **Çok bantlı** — capacitor'i ayarlayarak farklı bantlara

### ❌ Eksileri

-   **Dar bant** — her frekans için yeniden ayar (10-50 kHz BW)
-   **Uzaktan kontrol** gerekir — vacuum capacitor için motor + remote
-   **Düşük güç tolerans** — ≤100W, daha fazlası capacitor patlatır
-   **Verimi düşük** — küçük antenin bedeli, %30-60 efficiency (büyük dipole %95)

## Boyut hesabı

Loop çevresi λ/4'ten küçük olmalı (basit analizle). Pratik kural:

**Loop diameter (m) ≈ 0.1 × dalga boyu (m)**

| Bant | Frekans | Dalga boyu | Loop çapı (ideal) |
| --- | --- | --- | --- |
| 80m | 3.5 MHz | 86m | 8.6m (büyük!) |
| 40m | 7 MHz | 43m | 4.3m |
| 30m | 10 MHz | 30m | 3.0m |
| 20m | 14 MHz | 21m | 2.1m |
| 17m | 18 MHz | 17m | 1.7m |
| 15m | 21 MHz | 14m | 1.4m |
| 10m | 28 MHz | 11m | 1.1m |

Pratikte **1m çap loop** 40m'den 10m'ye %30-50 verimle çalışır. 80m için 1m loop **çok küçük**, %5-10 verim — yine de RX iyi, TX zayıf.

## Malzeme listesi (1m DIY loop)

### Loop kondüktör

-   **Bakır boru** (8-15 mm çap), ~3.2m uzunluk → 1m diameter loop
-   Veya **kalın bakır kablo** (RG-213 outer braid, AWG 4)
-   **Empedans:** kalın iletken = düşük loss, daha yüksek Q

### Ayar capacitor

-   **Vacuum variable** 100-300 pF (10 kV+) — pahalı (~$200-400) ama 100W tolere
-   **Air-spaced butterfly** ~$80-150 — orta güç (50W)
-   **Ucuz alternatif:** trimmer capacitor (en az 5 paralel) — sadece QRP

### Coupling loop

-   1/5 ana loop boyutunda (20cm çap if 1m main)
-   1 sarım, RG-58/8X ile besleme
-   **Faraday shield** ile RFI azaltma

### Yapısal

-   Plastik / fiber direk (loop'u dik tutar)
-   Plywood/MDF taban (15x15 cm)
-   M3-M4 cıvata + somun

### Maliyet (DIY)

-   Bakır boru 3.2m: ~250 TL
-   Vacuum capacitor (eBay used): ~$150 (3000 TL)
-   Coupling loop koaks + konnektör: ~100 TL
-   Yapısal malzeme: ~150 TL
-   **Toplam: ~3500-4000 TL**

Hazır MFJ-1786: ~$500 (~16K TL) → **DIY 4x daha ucuz**.

## Adım adım yapım

### Adım 1: Bakır boruyu kıvır

-   3.2m'lik 8-15mm bakır boruyu kütüphane masasına çek
-   Yavaşça yuvarla, **kıvırma yerlerini düzleştirme** (kink yapma)
-   Uçlara M6 lehim/kelepçe konnektör

### Adım 2: Capacitor monte

-   Vacuum capacitor'ü plywood tabana bağla
-   İki ucunu loop'un iki ucuyla **kalın bakır şerit** (kayıp az olsun) ile birleştir
-   **Lehim noktaları temiz** olmalı — RF için kritik

### Adım 3: Coupling loop

-   20cm çapında 1 sarım daha küçük loop (RG-8X braid'i)
-   Ana loop'a temas etmeyecek, eksantrik (off-center) konumda
-   Ortadan başlat, koaks shield ile besleme

### Adım 4: Test

-   NanoVNA ile sweep (1-30 MHz)
-   Vacuum capacitor'i ayarla → SWR minimum noktayı bul
-   14 MHz'de ayar, 50Ω civarına yaklaşmalı (1.5:1 SWR)
-   Coupling loop'u eğ — SWR düştüğünde optimal pozisyon

### Adım 5: Frekans değişimi

-   Capacitor'i 5pF değiştir → frekans 200 kHz değişir
-   Bu yüzden **motor + remote control** zorunlu — her kontak için fiziksel ayar yapamazsın

## Remote tuning sistemi

Vacuum capacitor manuel çevir = sürekli loop'un yanına gitmek. Çözüm:

### Stepper motor + Arduino

-   NEMA-17 stepper motor capacitor şaftına
-   Arduino Nano + driver (DRV8825)
-   Bluetooth/USB ile telsiz odasından kumanda
-   Maliyet: ~500 TL

### DC servo (basit)

-   12V DC motor + relay yön kontrolü
-   Sadece "+/-" kumanda → ileri-geri ayar
-   Daha basit ama daha az hassas
-   Maliyet: ~300 TL

### Ticari motor

-   MFJ-1916 stepper kit ~$150
-   Direkt kuruluma uygun

## Hazır modeller (alternatif)

DIY zor / zaman yok mu? Hazır:

| Model | Bant | Güç | Fiyat |
| --- | --- | --- | --- |
| **MFJ-1786** | 10-30 MHz | 150W | ~$500 (16K TL) |
| **Alpha Loop Magnetic** | 7-30 MHz | 25W | ~$700 (22K TL) |
| **Chameleon F-Loop 2.0** | 7-30 MHz | 25W | ~$500 |
| **AlexLoop Walkham** | 7-30 MHz | 10W | ~$500 |
| **Ciro Mazzoni Stealth** | 7-30 MHz | 1500W | ~$3000 — premium |

**MFJ-1786** en yaygın amatör tercihi: motor remote tuning + 150W tolerans + güvenilir.

## SWR ve verim ayarı

Loop antenler **çok dar bant** (Q yüksek) — capacitor 5 pF değişince SWR 1:1'den 5:1'e fırlayabilir.

### Test akışı

1.  Telsiz / NanoVNA → 50Ω çıkış
2.  Loop'a koaks bağla
3.  Ayar capacitor'i çevir
4.  SWR minimuma düşene kadar
5.  Eğer SWR < 2:1 ulaşamıyorsan → coupling loop pozisyonu eğ
6.  Eğer SWR sıfıra yaklaşıyor ama > 1.5 → coupling loop boyut/konum dene

### Tipik sonuçlar

-   14 MHz: SWR 1.2:1, BW 30 kHz
-   10 MHz: SWR 1.5:1, BW 25 kHz
-   7 MHz: SWR 1.8:1, BW 15 kHz
-   3.5 MHz: SWR 2.5:1, BW 8 kHz (zorla çalışır, dar)

## Kullanım ipuçları

### Yön

Loop **8 şekli** yayma deseni — loop düzlemine paralel yönde maksimum, dik yönde minimum. Loop'u çevirerek istenmeyen istasyonu (QRM) bastır, hedefi kuvvetlendir.

### İçeride mi dışarıda mı?

-   **İçeride**: çalışır ama yakın metal nesneler (radyatör, beton armatür) verim düşürür
-   **Balkonda/çatıda**: %20-40 daha verimli
-   **Ağaç / direk üstüne çıkar**: en iyi (yer yüzü etkisi azalır)

### Polarizasyon

-   **Yatay loop** (yere paralel) → yatay polarize, NVIS-friendly
-   **Dikey loop** (yere dik) → dikey polarize, DX'e iyi

## Sık sorulan sorular

### 5W ile dünya çapında DX yapılır mı?

Evet, FT8 ile. -20 dB SNR decode'u küçük antenlerin verim düşüşünü tolere eder. Magnetic loop + 5W FT8 = Avustralya / Brezilya kontak yaygın.

### Loop'un çevresi olsun mu, çapı olsun mu önemli?

**Çevre** = π × çap. 1m çap = 3.14m çevre. Hesaplarda **çevre** kullanılır.

### Çelik ya da alüminyum loop?

Bakır > alüminyum > çelik (iletkenlik açısından). Bakır en yüksek Q, en yüksek verim. Çelik 50% kayıp.

### Ev içi sahil mi mıknatıslı?

Hayır karışıklık yok — magnetic field'i sıradan mıknatıslı malzemelerle etkilenmez (frekans çok yüksek). Demir parçası loop yakınında olsa bile etki sınırlı.

* * *

## İlgili kaynaklar

-   [Apartmanda amatör telsizcilik](/tutorials/apartmanda-amator-telsizcilik) — anten stratejileri
-   [HF dipole + EFHW](/tutorials/hf-dipole-efhw-anten) — alternatif HF antenler
-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [NanoVNA ile ölçüm](/tutorials/nanovna-anten-olcumu)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — magnetic loop makaleleri
