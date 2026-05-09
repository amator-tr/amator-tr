---
title: NVIS Haberleşmesi — 50-500 km Yakın Menzil HF Mucizesi
description: >-
  NVIS (Near Vertical Incidence Skywave) ne işe yarar. Alçak HF dipol ile 50-500
  km menzil, ölü bölge yok, afet/EmComm için ideal. Frekans seçimi, anten
  yüksekliği, MUF.
keywords:
  - NVIS
  - HF
  - propagasyon
  - EmComm
  - anten
article_section: NVIS
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: NVIS için tunner gerek mi?
    a: >-
      80m yarım dalga dipole 80m bandında rezonant. Tunersız çalışır. Ama 40m
      bandında aynı dipole'a tuner ekleyince çoklu band NVIS yapabilirsin.
  - q: Apartman'da NVIS yapılır mı?
    a: >-
      Zor. Apartman 5. katsa anteniniz yerden çok yüksek — yer yüzü etkisi
      azalır, klasik HF DX olur. NVIS ideali için zemin / 1. kat balkon dipole.
  - q: En düşük güç ne kadar?
    a: >-
      NVIS güçten ziyade anten verimliliğine dayanır. 5-10W ile 200 km menzilde
      Q5 (mükemmel) sinyal raporu yaygın.
  - q: NVIS sırasında VHF röle de kullanılır mı?
    a: >-
      Evet, paralel. NVIS uzun mesafe (>30 km), VHF röle yakın şehir içi. İkisi
      farklı problem çözer.
  - q: NVIS gece mi gündüz mü?
    a: >-
      - Gündüz: 40m (7 MHz) ideal - Gece: 80m (3.5 MHz) ideal — ama F2
      yansımasıyla 40m de çalışır - Geç gece (00:00-04:00): MUF en düşük, 80m
      altın çağı
---
İki dağ arasındaki bir köyle iletişim. VHF röleler erişmez (line-of-sight kapalı). Standard HF DX antenlerle "ölü bölgeye" düşersin (skip zone). **Çözüm: NVIS** — sinyali dik yukarı atıp iyonosferden geri yansıtmak. 50-500 km dairesinde kesintisiz menzil, afet operasyonunun en güvenilir tekniği.

## Standard HF vs NVIS

### Klasik HF DX

-   Anten: yüksek dipole (≥0.5λ yükseklikte)
-   Yayma: düşük açı (10-30° ufuk yönlü)
-   Iyonosfer: tek hop ile **2000-4000 km uzağa** iner
-   Ölü bölge: 100-1500 km arası **boş** (skip zone)

### NVIS

-   Anten: **alçak** dipole (0.1-0.2λ yükseklikte)
-   Yayma: **dik yukarı** (60-90° açı)
-   Iyonosfer: hemen üstünden geri yansır
-   Iniş: **50-500 km dairesinde her yere**

## Fizik nasıl çalışıyor?

Sinyali **gökyüzüne ateş eder gibi** dik yukarı gönderiyorsun. Sinyal iyonosferin F katmanına çarpıyor ve bir **fıskiye** gibi bulunduğun bölgenin 0-500 km çapındaki alanına geri dökülüyor. Normal DX'te sinyali ufka yatık gönderirsin, uzaklara sektirilir — NVIS'te tam tersi, **dikine** çıkar ve yakın çevreye iner.

### "Ölü bölge" problemi ve NVIS çözümü

Normal HF'te **yer dalgası** 30-50 km gider ve sönümlenir. **Gök dalgası** ise iyonosferden yansıyıp en erken 800-1000 km öteye düşer. Aradaki **50-800 km bölgede** seni kimse duyamaz — bu "ölü bölge" (skip zone). NVIS bu devasa sessizliği yok eder: sinyali dikine gönderip tam o boşluğa düşürür.

İyonosfer (E + F2 katmanları, 100-400 km yüksek) HF dalgalarını yansıtır. Yansıma açısı **gelen açıya bağlı**:

-   **0° (yatay)** → uzak ufuk, çok düşük açıda
-   **30°** → 1500-3000 km mesafe
-   **60°** → 200-800 km mesafe
-   **90° (dik)** → **kaynağın üstüne, yakın menzil**

Frekans iyonosferin "**MUF**" (Maximum Usable Frequency) altında olmalı, aksi takdirde dik açıda yansıma olmaz, dalga uzaya kaçar.

### NVIS-friendly frekanslar

-   **3.5-5 MHz** (80m bandı) — gece her zaman çalışır
-   **5-7 MHz** (60m, 40m) — gün/gece çoğu zaman
-   **10-12 MHz** (30m) — gündüz, MUF düştüğünde çalışmaz
-   **\>14 MHz (20m)** — NVIS için **çoğu durumda yüksek**, dalga geçer

Pratik kural: **80m gece, 40m gündüz** — Türkiye için günün her saati birinde NVIS çalışır.

## Anten — düşük dipole

NVIS sırrı: **anten alçak**, normal HF tutorial'larda söylenenin tersi.

| Yükseklik | Maksimum yayma açısı | NVIS performans |
| --- | --- | --- |
| 0.05λ (80m'de 4m) | ~85° | Mükemmel |
| 0.1λ (8m) | 75° | Çok iyi |
| 0.15λ (12m) | 70° | İyi |
| 0.25λ (20m) | 60° | Sınırda |
| 0.5λ (40m) | 30° | NVIS değil — DX |

80m bandı için ideal yükseklik: **5-10 metre**. Sıradan ev çatısı, ağaç, direk — hepsi yeter.

### Tipik NVIS dipole

```
                Beslem hattı
                  │
                  ▼
         ┌────────●────────┐
         │  Yarım dalga     │
         │  (40m'de 20m,   │
         │   80m'de 40m)   │
         └─────────────────┘
            ↑ yer yüzüne 5-10m
```

-   80m: 40m uzunluk (her kanat 20m)
-   40m: 20m uzunluk (her kanat 10m)
-   Koaks: 10-30m, RG-8X veya RG-213

Yapımı [HF dipole tutorial](/tutorials/hf-dipole-efhw-anten)'unda detaylı.

### Yer yüzü etkisi

Dipole'u yer yüzüne yakın tuttuğunda yer "yansıtıcı" görevi görür — sanki anten 2 katı uzunluğunda gibi davranır:

-   **Toprak iletkenliği iyiyse** (nemli, kayalık değil) → daha iyi NVIS
-   **Kuru kum / kayalık** → kötü, radyal sermek gerekebilir
-   **Beton çatı** → orta, asfalt direkt zayıf

## NVIS hangi durumda kullanılır?

### Afet / EmComm

-   AFAD bölgesel haberleşme — Marmara'dan İstanbul/Bursa/Sakarya
-   Köye ulaşamayan kurtarma ekibi
-   VHF röleleri yıkılmış / antenleri devrilmiş
-   **NVIS = afet operatörünün altın silahı**

### Askeri kullanım

-   Comando ekipleri dağ-vadi haberleşmesi
-   50-300 km'lik tactical bölge

### Lokal HF "VHF gibi" kullanımı

-   Türkiye'de 100 km'lik mesafede HF kontak
-   80m gece sohbeti — Trabzon ↔ İzmir, sadece NVIS ile mümkün

## NVIS'i ne zaman kullanmamalı?

-   **DX hedefliyorsan** — alçak dipole düşük açı yapmaz, uzak DX zayıf
-   **Yüksek frekans (>14 MHz) gündüz** — MUF üstünde, sinyal uzaya kaçar
-   **VHF/UHF** — iyonosfer 30 MHz üstünde yansıtmaz (Es / sporadic-E hariç)

## NVIS test deneyi

Anteni kurdun, çalışıyor mu nasıl anlarsın?

### 1\. Yakın istasyonla schedule

Telefonla anlaş bir arkadaşla. 80-150 km uzakta. Sen TX yap, o RX dinlesin. Sinyal 5/9 ile geliyorsa NVIS çalışıyor.

### 2\. WSPR (otomatik test)

WSJT-X yazılımı + WSPR mod — düşük güçle (1W) test sinyali yay, dünya çapındaki receiver'lar pos hangi mesafelerde duyulduğunu kayıt eder. Eğer 50-500 km bandında yoğun reception varsa → NVIS başarılı.

### 3\. Reverse Beacon Network

CW yapan operatörler için RBN (reversebeacon.net) — sinyalini hangi istasyonlar duyduğunu raporlar.

## Sık sorulan sorular

### NVIS için tunner gerek mi?

80m yarım dalga dipole 80m bandında rezonant. Tunersız çalışır. Ama 40m bandında aynı dipole'a tuner ekleyince çoklu band NVIS yapabilirsin.

### Apartman'da NVIS yapılır mı?

Zor. Apartman 5. katsa anteniniz **yerden çok yüksek** — yer yüzü etkisi azalır, klasik HF DX olur. NVIS ideali için zemin / 1. kat balkon dipole.

### En düşük güç ne kadar?

NVIS güçten ziyade **anten verimliliği**ne dayanır. 5-10W ile 200 km menzilde Q5 (mükemmel) sinyal raporu yaygın.

### NVIS sırasında VHF röle de kullanılır mı?

Evet, paralel. NVIS uzun mesafe (>30 km), VHF röle yakın şehir içi. İkisi farklı problem çözer.

### NVIS gece mi gündüz mü?

-   **Gündüz:** 40m (7 MHz) ideal
-   **Gece:** 80m (3.5 MHz) ideal — ama F2 yansımasıyla 40m de çalışır
-   **Geç gece (00:00-04:00):** MUF en düşük, 80m altın çağı

## Sonuç

NVIS = **alçak dipole + 80m/40m bandı + dik yansıma**. Pratik, ucuz, afet için kritik. Türkiye'nin coğrafi yapısı (dağlar, vadiler) NVIS'e ideal — VHF röle erişmediği bölgelere bile NVIS sinyal geçer.

Sınavın B sınıfını verdiyseniz HF kullanım yetkiniz var, **bir 80m dipole + 5W vericisi 6000 TL altında** kurulur. Afet hazırlığının en kritik tek ekipman yatırımı.

* * *

## İlgili kaynaklar

-   [Afet acil durum haberleşmesi](/tutorials/afet-acil-durum-haberlesmesi)
-   [HF propagasyon temelleri](/tutorials/hf-propagasyon-temelleri)
-   [HF dipole + EFHW yapımı](/tutorials/hf-dipole-efhw-anten)
-   [Anten boy hesaplayıcı](/araclar/anten-hesaplayici/)
-   [Propagasyon canlı durumu](/araclar/propagasyon-durumu/) — NOAA SFI/K-index
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — NVIS makaleleri
