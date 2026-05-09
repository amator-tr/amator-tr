---
title: 'FT4 — FT8''in Hızlı Kuzeni, Contest İçin Optimize Dijital Mod'
description: >-
  FT4 dijital mod rehberi. FT8'den 2x hızlı (7.5 sn slot), contest için
  optimize, weak signal performansı, frekanslar, WSJT-X kurulumu, ne zaman FT4
  ne zaman FT8.
keywords:
  - FT4
  - FT8
  - dijital
  - contest
  - weak signal
article_section: FT4
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: FT4 contest dışında kullanılır mı?
    a: >-
      Evet ama daha az aktif. Hafta sonları 14.080 USB'i aç → cmpetent
      operatörler.
  - q: FT8'den FT4'e geçiş zor mu?
    a: WSJT-X aynı yazılım. 2 dakika Mode değiştir → ready.
  - q: En düşük güç FT4'te ne kadar?
    a: '- 5W ile yakın bölge - 25W ortalama - 50W contest tipik'
  - q: Türkiye'de FT4 popüler mi?
    a: Az ama büyüyor. CQ WW DX kontestlerinde 14.080 aktif Türkiye'den. ---
---
[FT8 tutorialımız](/tutorials/ft8-dijital-mod) standart 15-saniye dijital modunu işliyor. FT8 yetersiz hızlandığında: **FT4** = 7.5 saniyelik slot, contest için optimize, FT8'den 2x hızlı kontak.

## FT4 nedir?

Joe Taylor (K1JT) tarafından FT8'den kısa süre sonra (2019) geliştirildi. **FT8'in contest sürümü**:

-   **7.5 saniye** TX/RX (FT8: 15s)
-   90 Hz bandwidth (FT8: 50 Hz)
-   SNR limit -20 dB (FT8: -25 dB, biraz daha hassas FT8)
-   Aynı mesaj formatı

## FT4 vs FT8 karşılaştırma

| Özellik | FT8 | FT4 |
| --- | --- | --- |
| Slot süresi | 15s | 7.5s |
| BW | 50 Hz | 90 Hz |
| SNR limit | \-25 dB | \-20 dB |
| Kontak süresi | 75 sn | 35 sn |
| Saatte kontak | 30-50 | 80-150 |
| DX hassas | Daha iyi | Orta |
| Contest | İyi | **En iyi** |

## Hangi durumda FT4?

### ✓ FT4 tercih

-   **Contest** — saatte 100+ kontak hedef
-   **Pile-up** — DX yapan operatöre çağrı
-   **Bant açıklığı kısa** — meteor scatter / Es
-   **Yoğun pile-up'ı dağıtma**

### ✗ FT4 değil

-   **Casual DX** — FT8'in -25 dB hassasiyeti tercih
-   **WSJT contest** — bazı yarışmalar sadece FT8

## Frekanslar

| Bant | FT8 | FT4 |
| --- | --- | --- |
| 80m | 3.573 | 3.575 |
| 40m | 7.074 | 7.047.5 |
| 30m | 10.136 | 10.140 |
| 20m | 14.074 | 14.080 |
| 17m | 18.100 | 18.104 |
| 15m | 21.074 | 21.140 |
| 12m | 24.915 | 24.919 |
| 10m | 28.074 | 28.180 |
| 6m | 50.313 | 50.318 |

USB modunda, **+0.5 to 2 kHz offset** her bant için.

## Kurulum

WSJT-X **2.1+** sürümü FT4 desteklenir.

### Adım adım

1.  WSJT-X aç
2.  **File → Settings → Mode**: FT4
3.  **Frekans**: 14.080 (20m USB)
4.  Telsiz USB cable + audio sync
5.  TX power 25-50W (contest için yeter)

## Pratik kontak akışı (35 saniye)

FT4 kontağı:

```
[Sıra 1] CQ TB3KKD KN41
[Sıra 2] TB3KKD TA1ABC KM69
[Sıra 3] TA1ABC TB3KKD R-15
[Sıra 4] TB3KKD TA1ABC RR73
[Sıra 5] (kontak tamamlandı)
```

35 saniyede 73, log otomatik. Sonraki çağrı.

## Contest taktiği

### Run mode

-   "CQ contest" otomatik macro
-   Saniyede 1-2 yeni operatör cevap
-   80-100 QSO/saat ortalama

### Search & Pounce

-   Waterfall'da CQ atan operatörler bul
-   "Onun çağrısına" tıkla, otomatik exchange
-   50-80 QSO/saat

## Pile-up management

FT4'in büyük avantajı **paralel kontak**:

-   Aynı 7.5 sn'de 5-10 operatör cevap verir
-   WSJT-X her birini decode eder
-   Sırayla cevap verirsin → 1 kontağa diğer 9 bekleme

FT4 contest'te 200+ QSO/saat raporları yaygın (FT8'in 80'i).

## Frekans nezaketi

FT4 dar ama **90 Hz** (FT8'in 50'si değil). Yan yana 25 operatör paralel. Disiplin:

-   Boş slot bul
-   TX freq tıkla → kendi offset
-   Diğerlerine çakışma

## Sık sorulan sorular

### FT4 contest dışında kullanılır mı?

Evet ama daha az aktif. Hafta sonları 14.080 USB'i aç → cmpetent operatörler.

### FT8'den FT4'e geçiş zor mu?

WSJT-X aynı yazılım. **2 dakika** Mode değiştir → ready.

### En düşük güç FT4'te ne kadar?

-   5W ile yakın bölge
-   25W ortalama
-   50W contest tipik

### Türkiye'de FT4 popüler mi?

Az ama büyüyor. CQ WW DX kontestlerinde 14.080 aktif Türkiye'den.

* * *

## İlgili kaynaklar

-   [FT8 dijital mod](/tutorials/ft8-dijital-mod)
-   [JS8Call](/tutorials/js8call-radyo-chat-modu)
-   [WSPR](/tutorials/wspr-zayif-sinyal-yayini)
-   [Contesting rehberi](/tutorials/contesting-yarisma-rehberi)
-   WSJT-X: [physics.princeton.edu/pulsar/k1jt/](https://physics.princeton.edu/pulsar/k1jt/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/)
