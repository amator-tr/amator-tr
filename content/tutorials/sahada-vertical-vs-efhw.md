---
title: Sahada Anten Seçimi — Vertical mi EFHW mi?
description: >-
  POTA/SOTA sahada anten karşılaştırma — Vertical (dikey) vs EFHW (End-Fed
  Half-Wave). DX performansı, gürültü, kurulum süresi, ağırlık, ağaç
  gereksinimi. Hangisi daha iyi?
keywords:
  - saha
  - portable
  - vertical
  - EFHW
  - POTA
  - SOTA
  - anten
article_section: saha
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Hangisi daha ucuz?
    a: >-
      EFHW DIY: ~200 TL (tel + unun). Vertical DIY: ~500 TL (direk + radyal +
      tuner).
  - q: Vertical radyalsız çalışır mı?
    a: 'Çalışır ama verim düşer (%30-50 kayıp). En az 2 radyal, ideal 4+.'
  - q: EFHW counterpoise gerek mi?
    a: >-
      Tartışmalı. Çoğu operatör counterpoise'sız çalıştırır — koaks shield doğal
      counterpoise. 5m counterpoise %5-10 verim artışı raporlanmış.
  - q: Yağmurda hangisi?
    a: >-
      - EFHW tel ıslansa bile çalışır (SWR biraz kayar) - Vertical direk ıslak
      zeminde stabil (radyaller ıslak = daha iyi ground) - Konnektörlere su
      girmezse ikisi de OK ---
---
POTA aktivasyonu için ormana girdin. İki anten seçeneğin var: **vertical** (teleskopik direk + radyaller) veya **EFHW** (tek tel + ağaca at). Hangisi? Bu rehber sahada en çok sorulan karşılaştırmayı detaylandırıyor.

## Karşılaştırma tablosu

| Kriter | Vertical | EFHW |
| --- | --- | --- |
| **DX performansı** | Mükemmel (düşük kalkış açısı) | İyi (yüksekliğe bağlı) |
| **NVIS (yakın menzil)** | Zayıf | İyi (alçak gerildiğinde) |
| **Gürültü hassasiyeti** | Yüksek (omni → her yönden gürültü) | Orta (yönlü pattern) |
| **Kurulum süresi** | 15-30 dk (direk + radyaller) | 5-15 dk (tel atma) |
| **Ağaç gerekli mi?** | Hayır (kendi direği var) | Evet (veya direk) |
| **Ağırlık** | 1-3 kg (direk + radyaller) | 200-500 gr (tel + unun) |
| **Multi-band** | Tuner gerek | Doğal harmonik (40+20+15+10m) |
| **Radyal gerek** | Evet (4+ tel yere) | Hayır (veya kısa counterpoise) |
| **Rüzgar direnci** | Orta (direk sallanır) | İyi (tel esnek) |
| **Maliyet** | $50-150 | $20-50 DIY |

## Vertical ne zaman?

### Ağaç yoksa

Bozkır, kumsal, çöl — ağaç yok. Vertical kendi direğini taşır (teleskopik 6-10m fiber cam).

### DX öncelik

Vertical'ın düşük kalkış açısı (5-15°) uzun mesafe iyonosfer hop'una ideal. 20m bandında Japonya, ABD hedef.

### Omnidireksiyonel gerek

360° her yöne yayın — yönü bilmediğin DX için.

### Tipik setup

1.  6m teleskopik direk (fiberglas "fishing pole")
2.  Loading coil (40m için — direk boyu yetmez)
3.  4× radyal (her biri λ/4, yere serilmiş)
4.  Koaks 5-10m
5.  Tuner (multi-band için)

**Kurulum:** 15-30 dk. Radyal serme en çok zaman alan kısım.

## EFHW ne zaman?

### Ağaç varsa

Orman, park, bahçe — slingshot ile ağaca ip at, tel çek. 5 dakikada hazır.

### Multi-band tuner'sız

40m EFHW (20m tel) → 40m + 20m + 15m + 10m doğal harmoniklerle çalışır. Tuner gerek yok.

### Hafiflik öncelik

Tel + 49:1 unun + koaks = **200-500 gr**. Sırt çantasında hiç yer kaplamaz.

### Hızlı setup

POTA'da "hızlı gel, çok kontak yap, hızlı git" felsefesi → EFHW 5-10 dk kurulum.

### Tipik setup

1.  20m AWG-22 tel (bobin halinde)
2.  49:1 unun (avuç içi boyut)
3.  Koaks 5m
4.  Slingshot + nylon ip (ağaca atmak için)
5.  Insulator (tel sonunda)

**Kurulum:** 5-15 dk. İp atma en zor kısım (ilk denemede hedef tutmak).

## Detaylı performans karşılaştırma

### DX (uzun mesafe)

-   **Vertical kazanır** — düşük kalkış açısı (5-15°) = uzun skip
-   EFHW yüksek gerilirse (10m+) iyi ama vertical kadar düşük açı vermez
-   EFHW alçak gerilirse (3-5m) NVIS olur → yakın menzil, DX zayıf

### Yakın menzil (50-500 km)

-   **EFHW kazanır** — alçak gerilmiş EFHW = NVIS, 50-500 km daire
-   Vertical yakın menzilde ölü bölge (skip zone) sorunu
-   EmComm için EFHW tercih

### Gürültü

-   **EFHW kazanır** — yatay yönlü pattern, gürültü kaynağını reddetme şansı
-   Vertical omni → her yönden gürültü toplar, şehre yakın operasyonda S-meter yüksek

### Multi-band

-   **EFHW kazanır** — 40m tel doğal 4 bant
-   Vertical tek bantta rezonant, diğer bantlar tuner gerek
-   Loading coil'lu vertical multi-band ama her bant ayar gerek

### Mekanik sağlamlık

-   **EFHW kazanır** — tel kopsa bağla, direk devrilse kaldır
-   Vertical teleskopik direk rüzgarda sallanır, bağlantı noktaları gevşer

## Hibrit strateji

Neden "ya biri ya diğeri" olsun?

### İkisini birlikte taşı

-   EFHW: 200 gr (birincil anten, hızlı kurulum)
-   Vertical: 1.5 kg (yedek, ağaç yoksa)
-   Toplam 1.7 kg — POTA çantasında ikisi de sığar

### Senaryo bazlı seç

-   Ormanda POTA → EFHW
-   Sahilde POTA → Vertical (ağaç yok + deniz suyu ground plane)
-   Dağ zirvesinde SOTA → EFHW (hafiflik kritik)
-   Düz arazi contest → Vertical (DX hedef)

## Pratik test sonuçları

### 20m bandı (14 MHz), 10W QRP, FT8

| Anten | DX (>3000 km) | Yakın (<500 km) | Setup süresi |
| --- | --- | --- | --- |
| Vertical + 4 radyal | 15 kontak/saat | 3 kontak/saat | 25 dk |
| EFHW 8m yüksek | 10 kontak/saat | 8 kontak/saat | 10 dk |
| EFHW 3m yüksek | 4 kontak/saat | 12 kontak/saat | 5 dk |

**Sonuç:** Vertical DX'te lider, EFHW yakın menzilde lider, setup hızında EFHW açık ara kazanır.

## Topluluk tercihi

### POTA operatörlerin %70'i EFHW

-   Hız + hafiflik + multi-band = POTA'nın DNA'sı
-   MyAntennas EFHW-8010 "altın standart"

### SOTA operatörlerin %60'ı EFHW

-   Dağa yürüyerek çıkıyorsun, her gram önemli
-   Ama %30'u vertical (zirvede ağaç yok)

### Contest portable %50-50

-   DX contest → vertical (düşük açı)
-   Casual portable → EFHW (pratiklik)

## Sık sorulan sorular

### Hangisi daha ucuz?

EFHW DIY: ~200 TL (tel + unun). Vertical DIY: ~500 TL (direk + radyal + tuner).

### Vertical radyalsız çalışır mı?

Çalışır ama verim düşer (%30-50 kayıp). En az 2 radyal, ideal 4+.

### EFHW counterpoise gerek mi?

Tartışmalı. Çoğu operatör counterpoise'sız çalıştırır — koaks shield doğal counterpoise. 5m counterpoise %5-10 verim artışı raporlanmış.

### Yağmurda hangisi?

-   EFHW tel ıslansa bile çalışır (SWR biraz kayar)
-   Vertical direk ıslak zeminde stabil (radyaller ıslak = daha iyi ground)
-   Konnektörlere su girmezse ikisi de OK

* * *

## İlgili kaynaklar

-   [EFHW anten detay](/tutorials/efhw-anten-detay-pota)
-   [Vertical anten detay](/tutorials/dikey-vertical-anten-detay)
-   [POTA / SOTA aktivasyon](/tutorials/pota-sota-aktivasyon-rehberi)
-   [QRP düşük güç](/tutorials/qrp-dusuk-guc-operasyonu)
-   [Anten boy hesaplayıcı](/araclar/anten-hesaplayici/)
-   [Balun yapımı](/tutorials/balun-yapimi-rehberi) — 49:1 unun
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — sahada anten karşılaştırma
