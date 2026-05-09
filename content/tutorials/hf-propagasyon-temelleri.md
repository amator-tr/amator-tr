---
title: 'HF Propagasyon Temelleri — Sky Wave, Sporadic E, Güneş Döngüsü'
description: >-
  HF radyo dalgaları nasıl uzak mesafelere ulaşır — iyonosfer katmanları (D, E,
  F), MUF/LUF, sky wave atlamaları, sporadic E, güneş döngüsü ve günlük
  propagasyon tahmini.
keywords:
  - propagasyon
  - hf
  - iyonosfer
  - muf
  - sporadic-e
  - güneş-döngüsü
article_section: propagasyon
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Solar minimumda HF radyo değer mi?
    a: 'Evet — 80/40m gece HF DX hâlâ var, 20m gündüz çalışır. Sadece 10m durur'
  - q: Sporadic E ne kadar sürer?
    a: Saat-saat değişir. Bir Es açıklığı 30 dk - 5 saat
  - q: Polar geçişler farklı mı?
    a: Evet — auroral absorpsiyon kuzey bölge HF'sini bozar
  - q: Geomanyetik fırtına ne yapar?
    a: 'İyonosferi karıştırır, HF DX şansını düşürür ama 6m aurora-Es açabilir'
  - q: Greyline ne zaman?
    a: Gün doğumu + gün batımı saatlerinde 60-90 dk pencere
  - q: MUF nasıl ölçülür?
    a: 'Tahmin tools (DR2W, VOACAP, ITURHFP) propagasyon modelleri ile'
---
## Neden HF dalgaları "atlar"?

Bir VHF (144 MHz) telsiziyle düz arazide menziliniz ~5-10 km. Aynı 5W ile bir HF telsizinde (örneğin 14 MHz, 20m bandı) düzgün koşullarda **Avustralya'ya** ulaşabilirsiniz. Fark **iyonosfer**'dir — yer yüzeyinden 60-400 km yukarıda, güneş ışınlarıyla iyonize olmuş atmosferik katman.

Yer dalgası (ground wave) ufka kadar gider. Ama HF frekanslarında dalga **yukarı doğru** giden kısmı, iyonosfer tarafından **aşağı yansıtılır** — sanki devasa aynaya çarpıyormuş gibi:

```
              ┌─────── İyonosfer (200-400 km) ───────┐
              │                                       │
              │       yansıma                         │
              │       ↗     ↘                         │
              │      ↗       ↘                        │
              │     ↗         ↘                       │
              │    ↗           ↘                      │
              │   ↗             ↘                     │
              ▼  ↗               ↘                    │
   ─────────────────────────────────────────── Yer
   TX                                            RX
   1500 km uzaklık (tek atlama)
```

İki kez yansıyan dalga **3000+ km** ulaşır (multi-hop). Üç-dört atlamada dünya'nın diğer ucu — **DX**.

## İyonosfer katmanları

İyonosfer 4 ana katmana ayrılır (yerden yukarıya):

### D katmanı (60-90 km, gündüz only)

-   **Sadece gündüz** var (gece güneş yok = iyonizasyon yok = D katmanı kaybolur)
-   HF frekanslarını **emer** (yansıtmaz!)
-   80m, 40m gündüz **kötü** propagasyon — D katmanı emer
-   20m, 15m, 10m **iyi** — daha üst katmana ulaşır

### E katmanı (90-120 km)

-   Gündüz aktif, gece zayıf
-   Yakın menzil (100-1000 km) için iyi yansıtıcı
-   **Sporadic E (Es)**: yaz ayları (Mayıs-Ağustos) E katmanında yoğun parçalar oluşur → 50-150 MHz arası bantlar (6m, 4m, 2m hatta UHF) açılır
-   TR'de 6m sezonu Haziran-Temmuz peak

### F1 katmanı (150-220 km, gündüz only)

-   F2 ile birleşir gece (F katmanı tek)
-   Pratik amatör radyo'da F1 ayrı önemli değil

### F2 katmanı (200-400 km — en kritik!)

-   HF DX'in **ana yansıtıcısı**
-   **Maximum Usable Frequency (MUF)** — bu katmanda yansıtılabilen en yüksek frekans
-   F2 yoğunluğu güneşin UV ışınımıyla doğru orantılı → **güneş döngüsü** burayı yönetir

## Güneş döngüsü (11 yıllık)

Güneş 11 yıllık döngülerde **leke (sunspot)** sayısı dalgalanır:

-   **Solar minimum** (az leke, MUF düşük) — HF DX zor, 10m bant ölü, 20m gündüz iyi
-   **Solar maximum** (çok leke, MUF yüksek) — 10m + 6m sürekli açık, 50 MHz'a kadar dünya geneli DX

Şu an (2025-2026): **Solar Cycle 25**, peak 2024-2025 civarı. Önümüzdeki 2-3 yıl HF için **altın çağ**. 2030+ minimum, 2035 yeni peak.

### Pratik etki

| Cycle aşaması | 80m | 40m | 20m | 15m | 10m | 6m |
| --- | --- | --- | --- | --- | --- | --- |
| Solar minimum | Gece OK | Gece OK | Gündüz OK | Zor | Ölü | Sporadic E only |
| Solar maximum | Gece OK | Gündüz+gece | 24 saat | Çok iyi | Çok iyi | Açık günler bol |

## MUF, LUF, FOT

Üç temel propagasyon parametresi:

| Parametre | Anlam | Tipik (gündüz, mid-cycle) |
| --- | --- | --- |
| **MUF** (Maximum Usable Frequency) | F2'nin yansıtabildiği en yüksek frekans | 20-30 MHz |
| **LUF** (Lowest Usable Frequency) | D katmanı emiziminin altında kullanılabilir min | 3-7 MHz |
| **FOT** (Frequency of Optimum Transmission) | Pratikte en güvenilir frekans | 0.85 × MUF |

**Pratik kural:** Anti-dazza kontağı için frekansı **MUF'in altında, LUF'un üstünde** seç. MUF altında → yansır. MUF üstünde → uzaya kaçar (ya da çok sıyırarak gider).

## Diurnal (gündüz/gece) varyasyonu

İyonosfer **gündüz/gece** aşırı değişir:

```
Gündüz:                          Gece:
┌────────────────────┐          ┌────────────────────┐
│ F2 (yoğun)        │          │ F (zayıflamış)     │
│ ────────────────  │          │ ────────────────   │
│ F1                 │          │                    │
│ ────────────────  │          │                    │
│ E (orta)          │          │                    │
│ ────────────────  │          │                    │
│ D (emici)         │          │                    │
└────────────────────┘          └────────────────────┘
```

-   **Gündüz**: D var → 80m absorpsiyonlu, 20m+ iyi
-   **Gece**: D yok → **80m + 40m DX** çok iyi (greyline propagation, gün-gece sınırı boyunca)
-   **Gün doğumu / batımı**: "**Greyline**" — özel propagasyon penceresi (60-90 dk), HF DX altın saat

## Sporadic E (Es) — yaz mucizesi

Mayıs-Eylül arası yaz aylarında E katmanında **yoğunlaşan iyon parçaları** oluşur. Sebep tam anlaşılmadı (atmosferik gel-git, meteor giriş, vs.).

Etkisi:

-   **6m bandı (50 MHz)** — TR'de Mayıs-Temmuz çok aktif, kıtasal Avrupa + Akdeniz havzası
-   **2m bandı (144 MHz)** — Es nadir ama imkansız değil; Avrupa-içi
-   **27 MHz CB / 28 MHz amatör 10m** — yaz öğleden sonraları "mucizeler"

Sporadic E **anlık** — saat içinde açılıp kapanır. APRS Es spotting (`6mEs`, `2mEs`) hashtag'leri Twitter'da/aprs.fi'de takip edilir.

## NVIS — Near Vertical Incidence Skywave

Düşük HF frekansını (3.5-7 MHz) **dik yukarı** gönderirseniz iyonosfer "neredeyse dik" yansıtır → **yakın menzil** (100-300 km) bütün ufka kapsama. Çatı engelleri/dağ aşmaya gerek yok.

Kullanım:

-   Yerel acil iletişim (AFAD koordinasyonu)
-   Aynı bölgenin tüm illeri kapsama
-   HF dipole **çok düşük** (1-3 m yer üstü) — NVIS pattern'i bunu ister

## Propagasyon tahmin araçları

Anlık + günlük tahmin:

| Site | Açıklama |
| --- | --- |
| [**hamqsl.com/solar.html**](https://www.hamqsl.com/solar.html) | Solar Flux Index (SFI), K/A indeks, MUF haritası |
| [**dx.qsl.net/propagation/**](http://dx.qsl.net/propagation/) | Bant başına gerçek-zamanlı tahmin |
| [**vk7tw.org/MUFmap.htm**](http://vk7tw.org/MUFmap.htm) | Dünya MUF haritası |
| [**solarham.net**](https://www.solarham.net) | Güneş aktivitesi raporu |
| [**pskreporter.info**](https://pskreporter.info) | FT8/diğer dijital sinyaller — gerçek-zamanlı kim duyuyor kimi |
| [**reversebeacon.net**](https://reversebeacon.net) | CW skimmer ağı — sinyalinizin kim tarafından duyulduğu |

### Tipik solar değer rehberi

| SFI (Solar Flux) | Anlam |
| --- | --- |
| < 70 | Kötü, 10m ölü |
| 70-100 | Orta, 20m gündüz OK |
| 100-150 | İyi, 15-10m DX |
| 150-200 | Çok iyi, tüm bantlar açık |
| \> 200 | Mükemmel, 6m sporadic Es ek bonus |

| K-index | Anlam |
| --- | --- |
| 0-2 | Sakin, propagasyon iyi |
| 3-4 | Orta, bazı bantlar dalgalı |
| 5+ | Geomanyetik fırtına — HF kötü, polar bölge yuvarlak |
| 7+ | Aurora ihtimal, 6m + 2m polar olağandışı açık |

## Bant-bant rehber

### 80m (3.5 MHz)

-   Gündüz: yakın menzil (200 km)
-   Gece: ulusal + kontinent (Avrupa, Orta Doğu)
-   Optimal: gece + greyline

### 40m (7 MHz)

-   24 saat aktif
-   En çok kontak bandı (en kalabalık)
-   Greyline DX altın saat

### 20m (14 MHz)

-   **HF'in kralı**, 24 saat global DX
-   Gündüz Avustralya, gece Amerika
-   Solar peak'te en iyi

### 15m (21 MHz)

-   Gündüz mid-cycle ve sonrası mükemmel
-   Solar minimumda kapalı

### 10m (28 MHz)

-   "Magic band #2"
-   Solar peak'te dünya geneli, sürekli açık
-   Solar minimum: sporadic Es ile yazın açılır

### 6m (50 MHz, "Magic Band")

-   Sporadic Es sezonu Haziran-Ağustos
-   Solar maxda F2 ile global DX nadiren
-   TR'de en heyecanlı bant

## Pratik öneri — bir QSO planlamak

Avustralya'ya kontak yapmak istiyorum, hangi bant + saat?

1.  [hamqsl.com](https://www.hamqsl.com) → SFI = 145 (iyi)
2.  K-index = 1 (sakin)
3.  Saat 16:00 TRT (12:30 UTC, Avustralya öğlen sonrası)
4.  **Long path** (ters dünya turu): 20m, daha sonra 40m greyline
5.  **Short path** (Avustralya yönü, doğu): 14.205 MHz SSB veya FT8

Plan: 16:00-18:00 arası 20m, 18:00-20:00 greyline 40m, 20:00+ 80m.

## Sık sorulan sorular

| Soru | Cevap |
| --- | --- |
| Solar minimumda HF radyo değer mi? | Evet — 80/40m gece HF DX hâlâ var, 20m gündüz çalışır. Sadece 10m durur |
| Sporadic E ne kadar sürer? | Saat-saat değişir. Bir Es açıklığı 30 dk - 5 saat |
| Polar geçişler farklı mı? | Evet — auroral absorpsiyon kuzey bölge HF'sini bozar |
| Geomanyetik fırtına ne yapar? | İyonosferi karıştırır, HF DX şansını düşürür ama 6m aurora-Es açabilir |
| Greyline ne zaman? | Gün doğumu + gün batımı saatlerinde 60-90 dk pencere |
| MUF nasıl ölçülür? | Tahmin tools (DR2W, VOACAP, ITURHFP) propagasyon modelleri ile |

## Yararlı kaynaklar

-   [QSL.net 4X4XM Skywave Propagation](https://www.qsl.net/4x4xm/HF-Propagation.htm) (en sade)
-   [F2 Propagation Wikipedia](https://en.wikipedia.org/wiki/F2_propagation)
-   [Sporadic E Wikipedia](https://en.wikipedia.org/wiki/Sporadic_E_propagation)
-   [VU2NSB: Ionospheric Skywave](https://vu2nsb.com/radio-propagation/ionospheric-skywave-propagation/)
-   [SWS BoM: Intro to HF Propagation (PDF)](https://www.sws.bom.gov.au/Category/Educational/Other%20Topics/Radio%20Communication/Intro%20to%20HF%20Radio.pdf) — Avustralya hava bürosu
-   [hamqsl.com/solar.html](https://www.hamqsl.com/solar.html) — günlük SFI/K
-   [pskreporter.info](https://pskreporter.info) — gerçek FT8 propagasyon

## Sıradaki adımlar

-   [HF Dipole / EFHW Anten](/tutorials/hf-dipole-efhw-anten) — propagasyon kuramını bilen anten için
-   [FT8 Dijital Mod](/tutorials/ft8-dijital-mod) — propagasyon koşullarını anlık doğrulama
-   [DXCC ve DX Hunting](/tutorials/dxcc-dx-hunting) — propagasyonu pratiğe çevirme
-   [Mors Kodu](/tutorials/mors-kodu-ogrenme) — zayıf sinyal koşullarında en iyi mod

73, ve **iyi propagasyon!**
