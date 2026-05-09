---
title: 'İyonosfer Katmanları ve Radyo Dalgalarının Yolculuğu (D, E, F1, F2)'
description: >-
  İyonosfer katmanlarının fiziği — D, E, F1, F2 katmanlarının özellikleri,
  MUF/LUF/FOT, sporadic E, gri çizgi, solar cycle etkisi. HF DX'in fiziksel
  altyapısı.
keywords:
  - iyonosfer
  - propagasyon
  - HF
  - MUF
  - sporadic E
article_section: iyonosfer
published_at: '2026-04-26'
updated_at: '2026-04-26'
---
HF bantlarında 5 watt'la Avustralya'ya kontak yapabilmenin sırrı atmosferdedir. **İyonosfer** = atmosferin 60-1000 km yüksekteki bölümü, güneş radyasyonuyla iyonlaşmış elektronlar. Radyo dalgalarını yansıtır → dünya çapında menzil. Bu rehber katmanların fiziği + amatör operatörü için pratik etkileri.

## Atmosfer katmanları (alttan üste)

| Katman | Yükseklik | Fonksiyon |
| --- | --- | --- |
| Troposfer | 0-12 km | Hava, bulutlar |
| Stratosfer | 12-50 km | Ozon tabakası |
| Mezosfer | 50-90 km | Meteor yanıkları |
| **Termosfer / İyonosfer** | **60-1000 km** | **Elektron iyonizasyonu** |
| Ekzosfer | 1000+ km | Uzaya geçiş |

İyonosfer aslında termosfer içinde — 60-1000 km arasında elektron yoğunluğu yüksek olan **alt katmanlar**.

## İyonosfer alt-katmanları

İyonosfer 4 alt katmana ayrılır, gündüz ve gece davranışları farklı:

### D katmanı (60-90 km)

-   **Sadece gündüz** — geceleri kaybolur
-   Düşük frekansları (3 MHz altı) **soğurur** (absorpsiyon yapar)
-   **Yansıtmaz, emer**
-   Pratik etki: 80m bandı gündüz "ölür" çünkü D katmanı sinyali yutar

### E katmanı (90-130 km)

-   Gündüz/gece var, gündüz daha yoğun
-   3-5 MHz'i yansıtır, kısa mesafelerde
-   **Sporadic E (Es)** — özel olay, aşağıda detay

### F1 katmanı (160-200 km)

-   **Sadece gündüz**, geceleri F2 ile birleşir
-   HF orta-bantları yansıtır

### F2 katmanı (200-400 km)

-   **24 saat aktif**
-   HF DX'in **ana yansıtıcısı** — uzun mesafe kontağın iyesi
-   Yükseklik gece artar (300-400 km) → daha uzun atlama

## Radyo dalgası iyonosferden nasıl yansıyor?

Yansıma değil, **kırılma** (refraction). Plasma yoğunluğu yüksekse dalga geri eğilir.

Frekans yükseldikçe iyonosfer plazmasının "kırma indeksi" değişir:

-   Düşük frekans → güçlü kırılma → kolayca yansıma
-   Yüksek frekans → zayıf kırılma → uzaya kaçma riski

İlişkide üç kritik frekans:

### MUF (Maximum Usable Frequency)

İyonosferin yansıtabileceği **en yüksek frekans**. F2'de gündüz 25-40 MHz, gece 10-15 MHz.

> Yayın yapacağın frekans MUF altında olmalı. Üstündeyse uzaya kaçar, kontak olmaz.

### LUF (Lowest Usable Frequency)

D katmanı soğurmasının **galip geldiği** en düşük frekans. Genelde 2-5 MHz arası.

### FOT (Frequency of Optimum Traffic)

MUF × 0.85 — en güvenilir DX frekansı. MUF'a yakınken propagasyon dalgalı olabilir.

## Pratik etkileri (amatör operatör için)

### Gündüz vs gece bantları

| Bant | Gündüz | Gece |
| --- | --- | --- |
| 80m (3.5 MHz) | D soğurur, kısa mesafe | F2 yansıtır, **uzun DX** |
| 40m (7 MHz) | F1/F2 yansıtır, orta mesafe | F2, çok uzun DX |
| 20m (14 MHz) | F2, uzun DX altın çağı | F2, sınır mesafede |
| 10m (28 MHz) | Sadece yüksek SFI'da | Genelde **ölü** |

### "Gri çizgi" (Gray Line)

Gündüz/gece sınırı — terminator. Bu hat üzerinde D katmanı henüz yok / yeni oluşuyor → soğurma minimum, propagasyon altın çağı.

> Sabah 6-8 ve akşam 17-19 (lokal) DX için en iyi saatler. 80m gece operatörü 80m'in günbatımına yakın saatlerde antipod (dünyanın öbür ucu) kontak yapar.

### Skip distance (atlama mesafesi)

Yansıma açısına göre dalganın indiği yer. **Ölü bölge** = anten ile ilk skip arasındaki ulaşılamaz alan.

-   14 MHz, F2 200km yükseklik → ilk skip ~2000-3000 km
-   7 MHz, F2 → ilk skip ~1500-2500 km
-   3.5 MHz, F2 (gece) → ilk skip ~500-1500 km

NVIS (yakın menzil) için **dik yansıma** kullanılır — skip yok, anten üstüne iniş. [NVIS tutorial →](/tutorials/nvis-haberlesmesi)

## Sporadic E (Es)

E katmanında **ani, geçici, lokalize** iyonizasyon yoğunlaşması. Yaz aylarında (Mayıs-Ağustos kuzey yarımküre) sıkça görülür.

### Etkileri

-   28-50 MHz (10m, 6m) bantlarda **kıtalar arası** kontak mümkün
-   144 MHz (2m) bile bazen Es ile kontak yapabilir (nadir, heyecan verici)
-   Mesafe genelde 800-2000 km, single-hop

### Önbelirti

-   28 MHz (10m) sürekli açık, FM TV/radyo Es ile geçer
-   Gündüz erken saatlerde başlar, akşam zayıflar
-   50.110 MHz CW beacon dinleme → açıklığı önceden tespit

### Pratik

Yaz aylarında 6m monitor et — Es açılınca 1-2 saatlik DX patlaması.

## Solar Cycle (11 yıllık döngü)

Güneş aktivitesi 11 yıllık döngü → iyonosfer yoğunluğu değişir.

### Solar maksimum

-   SFI (Solar Flux Index) 150+ → MUF yüksek (40+ MHz)
-   10m, 12m bantları sürekli açık
-   DX altın çağı

### Solar minimum

-   SFI 70-90 → MUF düşük (20 MHz altı)
-   80m, 40m'e bağlı kalmak gerekir

**Cycle 25** (2020-2031) şu anda zirve civarında. SFI 150-200 görünüyor — DX yapacaksanız **şimdi yapın**, 2026-2027 zirve sonrası.

[Canlı NOAA propagasyon durumu →](/araclar/propagasyon-durumu/)

## Geomanyetik fırtınalar

Güneşten gelen koronal kütle atımları (CME) → dünyanın manyetik alanı bozulur → iyonosfer disrupted.

### K-index (3-saatlik manyetik aktivite)

-   K=0-2: sakin → mükemmel propagasyon
-   K=3-4: aktif → minor disruption
-   K=5-6: fırtına → HF zayıflar, polar bantlar kapanır
-   K=7-9: şiddetli fırtına → HF blackout, aurora görünür

### Aurora propagasyon

Yüksek K-index'te kuzey kutbu/yakın enlemlerde 30-100 MHz'de aurora reflection — VHF DX'in egzotik formu.

## Yansıma sayısı (multi-hop)

Tek hop ~3000 km. Daha uzak DX için **multi-hop**:

-   1 hop: Türkiye → Avrupa
-   2 hop: Türkiye → Hindistan / Sibirya
-   3-4 hop: Türkiye → Avustralya / Karayipler

Her hop'ta sinyal **3-6 dB kayıp** — 4 hop'tan sonra çok zayıf.

**Long path**: dünyanın diğer tarafından gelen sinyal — Türkiye'den Brezilya'ya gri çizgi sırasında kısa yol yerine uzun yol gelmek mümkün, yine 3-4 hop ama farklı yön.

## Antipod nokta

Tam zıt nokta — Türkiye'nin antipodu Pasifik'te (Yeni Zelanda yakını). Antipod kontağı en zor DX — sinyaller her yönden gelir, fading kuvvetli, sadece 80m grayline'da olur.

## Iyonosfer sondaj (ionosonde)

Profesyonel cihazlar (Türkiye'de KEGM/Sivas) atmosfere sweep frekans gönderir, yansıma süresinden katman yüksekliği ölçer. **MUF + critical frequency** real-time çıktı verir.

Amatör için **WSPR ağı** alternatif — operatörler düşük güçle sinyal yayınlar, dünya çapında receiver'lar duyma noktalarını rapor eder. Pratik MUF haritası gibidir.

## Pratik özet

| Senaryo | Strateji |
| --- | --- |
| HF DX yapmak | F2 saatlerini hedefle: gündüz 14-21 MHz, gece 3.5-7 MHz |
| 50-500 km kontak | NVIS — dik yansıma, alçak dipole |
| 6m / 2m DX | Yaz Sporadic E sezonunu bekle |
| Solar minimum | 80/40m'e konsantre ol, 10m unutma |
| Geomanyetik fırtına | HF zor, CW/dijital tek şans, FM röleler etkilenmez |
| Aurora propagasyon | K-index>5 ise 6m/2m N→N kontak dene |

* * *

## İlgili kaynaklar

-   [HF propagasyon temelleri](/tutorials/hf-propagasyon-temelleri) — pratik bantlar
-   [NVIS haberleşmesi](/tutorials/nvis-haberlesmesi) — yakın menzil
-   [HF Propagasyon canlı durum](/araclar/propagasyon-durumu/) — NOAA SFI/K
-   [DXCC ve DX hunting](/tutorials/dxcc-dx-hunting)
-   WSPR ağı: [wsprnet.org](https://wsprnet.org/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — iyonosfer makaleleri
