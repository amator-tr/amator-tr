---
title: 'Telsiz Güç Kaynakları Rehberi — Lineer mi, Switching mi?'
description: >-
  Amatör telsiz güç kaynağı seçimi — lineer (trafolu) vs switching
  (anahtarlamalı). 13.8V DC, akım hesabı, RF gürültü, akü besleme, solar, araç
  12V, portable QRP.
keywords:
  - güç kaynağı
  - PSU
  - lineer
  - switching
  - 13.8V
  - başlangıç
article_section: güç kaynağı
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Bilgisayar güç kaynağı (ATX PSU) kullanabilir miyim?
    a: >-
      Teknik olarak evet — ATX 12V hattı 20-30A verir. Ama: - Voltaj 12V (13.8V
      değil) → telsiz güç output düşük - RF gürültü yüksek - Ambalajlı olmadığı
      için güvenlik sorunları - Önerilmez, sadece acil veya deney için
  - q: En sessiz PSU?
    a: >-
      Lineer (fan yok). Switching'te fanless modeller var (Diamond GZV-4000) ama
      nadiren >20A.
  - q: PSU bozulursa telsiz yanar mı?
    a: >-
      İyi PSU'larda overvoltage protection (OVP) var — voltaj 15V'u geçerse
      kapanır. Ucuz PSU'larda bu koruma yok → telsiz yanar. OVP var mı kontrol
      et.
  - q: Araçta güç kaynağı yerine ne kullanırım?
    a: >-
      Araç akü direkt — 13.8V (motor çalışırken). DC kabloda sigorta (10-30A)
      zorunlu. Araç anten tutorial → ---
---
Telsizinize odaklanırsınız — ekran, filtre, anten. Ama aldığınız ses kalitesi ve gönderdiğiniz sinyalin temizliği doğrudan masanızın altındaki **güç kaynağına** bağlı. Kalitesiz bir switching PSU HF'te gürültü kaynağı olur, pahalı bir lineer PSU ise 15 kg ağırlığıyla sizi bel fıtığına davet eder. Bu rehber doğru seçim.

## Neden özel güç kaynağı?

Evdeki priz 220V AC verir. Telsizler genelde **13.8V DC** ile çalışır. Güç kaynağı sadece voltajı düşürmez — akımı **tertemiz** yapmak zorunda. Pürüzlü DC = ses kalitesinde hum + dijital modlarda decode hatası.

## İki ana teknoloji

### 1\. Lineer (trafolu) güç kaynağı

İçinde devasa bakır trafo bulunan, ağır, güven veren klasik cihaz.

**Çalışma:** Voltajı trafo ile düşürür, transistörlerle regüle eder. Basit, az bileşen.

**Artıları:**

-   **RF gürültüsü üretmez** — HF'te kritik avantaj
-   Sessiz (fan gerektirmez çoğu modelde)
-   Arıza yapınca tamir kolay (az parça, büyük bileşen)
-   20-30 yıl ömür

**Eksileri:**

-   **Çok ağır** — 30A lineer PSU 12-15 kg (bel fıtığı riski gerçek)
-   Verim düşük (%40-50) — çok ısınır
-   Pahalı ($200-400)
-   Büyük fiziksel hacim

**Kim için:** Sabit HF istasyonunda **tertemiz sinyal** isteyen, ağırlık önemsemeyen.

**Önerilen modeller:**

-   **Astron RS-35M** (~$250) — 35A, 13.8V, analogue metre, ABD altın standartı
-   **Alinco DM-330MV** (~$200) — 30A, Japon kalitesi
-   **MFJ-4035MV** (~$200) — 30A, bütçe dostu

### 2\. Switching (anahtarlamalı) güç kaynağı

Bilgisayar adaptörlerine benzer mantık — yüksek frekansta açıp kapatarak voltaj düzenler.

**Çalışma:** AC → düşük frekanslı trafo yerine yüksek frekanslı (kHz) anahtarlama → DC. Daha küçük trafo = daha hafif.

**Artıları:**

-   **Çok hafif** — 30A switching PSU 2-3 kg
-   Küçük hacim (masaüstü sığar)
-   Ucuz ($80-150)
-   Verim yüksek (%80-90), az ısınır

**Eksileri:**

-   **RF gürültüsü** — kalitesiz modeller HF'te broadband noise üretir (switching harmonics)
-   Fan gürültüsü (bazı modeller yüksek)
-   5-10 yıl ömür (kapasitör yaşlanması)
-   Tamiri zor (SMD bileşenler)

**Kim için:** VHF/UHF operatör (gürültü daha az sorun), portable, bütçe kısıtlı, alan dar.

**Önerilen modeller:**

-   **Meanwell RSP-320-13.5** (~$80) — endüstriyel, güvenilir, 24A
-   **Samlex SEC-1235** (~$150) — ham radio optimize, düşük noise
-   **Diamond GZV-4000** (~$200) — premium switching, RF filtreli

## Karşılaştırma tablosu

| Özellik | Lineer | Switching |
| --- | --- | --- |
| **Ağırlık** (30A) | 12-15 kg | 2-3 kg |
| **RF gürültü** | Sıfır | Düşük-yüksek (modele bağlı) |
| **Verim** | %40-50 | %80-90 |
| **Fiyat** | $200-400 | $80-200 |
| **Ömür** | 20-30 yıl | 5-10 yıl |
| **Isınma** | Çok (büyük heatsink) | Az |
| **Tamir** | Kolay | Zor |
| **Ses (fan)** | Sessiz | Fan (bazıları gürültülü) |

## Akım hesabı

Telsizinizin **peak akım tüketimini** bilin:

| Telsiz | TX akım | PSU gereken |
| --- | --- | --- |
| Baofeng UV-5R (5W) | 1.5A | 3A yeter |
| Yaesu FT-65R (5W) | 2A | 5A yeter |
| Icom IC-7300 (100W) | 23A | **30A PSU** |
| Yaesu FT-991A (100W) | 23A | **30A PSU** |
| Yaesu FT-DX10 (100W) | 22A | **30A PSU** |

**Kural:** PSU akımı telsiz peak tüketiminin **%120-150'si** olmalı. IC-7300 23A çeker → 30A PSU alın (marj).

## HF'te switching gürültü sorunu

Ucuz switching PSU'lar 50-200 kHz arasında **harmonik gürültü** üretir. Bu harmonikler HF bantlarına (1.8-30 MHz) sızar → S-meter'ı S3-S5 artırabilir.

### Test

1.  Telsizi PSU'ya bağla, anten takma
2.  HF bantları dinle (80m, 40m, 20m)
3.  Hum / buzz / whine var mı?
4.  PSU'yu kapat, bataryaya geç → gürültü kaybolursa PSU suçlu

### Çözüm

-   **Ferrit choke** PSU DC kablolarına (Mix-31, 5-10 sarım)
-   **DC-DC filter** PSU ile telsiz arasına (Samlex, MFJ)
-   **Kaliteli PSU** al (Meanwell RSP serisi endüstriyel, iyi filtreleme)
-   **Lineer'e geç** — en kesin çözüm (HF DX ciddi ise)

## Batarya besleme (portable)

### LiFePO4 (modern standart)

-   12.8V nominal (13.8V'a yakın)
-   10Ah → IC-705 ile 8+ saat
-   20Ah → IC-7300 ile 1-2 saat (100W TX ağır)
-   Güvenli (yanma/patlama riski az)
-   ~$100-200 (10-20Ah)

### AGM / GEL akü

-   12V, 7-35Ah
-   Ağır (7Ah = 2.5 kg)
-   Ucuz (~$30-50)
-   Emergency backup için ideal

### Araç akü (12V)

-   Araç çalışırken 13.8V (alternatör)
-   Araç kapalıyken 12.4V (düşük, telsiz kapanabilir)
-   **Motor çalışırken alternatör gürültüsü** → DC kabloda ferrit

## Solar besleme (off-grid)

QRP (5W) için 20-50W panel yeter:

-   50W panel → charge controller → LiFePO4 10Ah → telsiz
-   Gündüz solar + gece batarya = 24 saat operasyon
-   POTA/SOTA favorisi

100W telsiz için 200W+ panel gerek — portable değil, sabit kurulum.

## 13.8V neden?

Tarihsel sebep: araç akü nominal 12V, şarj halinde 13.8V. Telsizler bu voltaja göre tasarlandı. 12V altında performans düşer (power output azalır), 15V üstünde **cihaz yanar**.

### Voltaj regülasyonu

-   İyi PSU: ±0.1V (13.7-13.9V sürekli)
-   Kötü PSU: ±0.5V (yüksek tüketimde 12.5V'a düşer) → telsiz kapanır
-   **Load regulation** spec'i kontrol et (datasheet)

## DC kablo kalitesi

Telsiz kutusundan çıkan DC kablosu genelde AWG-12 (3m). Uzun hat (>3m) için:

-   **AWG-10** (5m'ye kadar)
-   **AWG-8** (10m'ye kadar)
-   Kalın kablo = düşük voltaj düşümü

### Anderson Powerpole

Modern ham radio DC standart konnektör:

-   15/30/45A versiyonları
-   Quick-connect (lehim yok)
-   Polarize (ters takılmaz)
-   ~$5-10 / çift

## Sık sorulan sorular

### Bilgisayar güç kaynağı (ATX PSU) kullanabilir miyim?

Teknik olarak evet — ATX 12V hattı 20-30A verir. Ama:

-   Voltaj **12V** (13.8V değil) → telsiz güç output düşük
-   RF gürültü yüksek
-   Ambalajlı olmadığı için güvenlik sorunları
-   **Önerilmez**, sadece acil veya deney için

### En sessiz PSU?

Lineer (fan yok). Switching'te **fanless** modeller var (Diamond GZV-4000) ama nadiren >20A.

### PSU bozulursa telsiz yanar mı?

İyi PSU'larda **overvoltage protection** (OVP) var — voltaj 15V'u geçerse kapanır. Ucuz PSU'larda bu koruma yok → telsiz yanar. **OVP var mı** kontrol et.

### Araçta güç kaynağı yerine ne kullanırım?

Araç akü direkt — 13.8V (motor çalışırken). DC kabloda sigorta (10-30A) zorunlu. [Araç anten tutorial →](/tutorials/arac-telsiz-anteni-secimi)

* * *

## İlgili kaynaklar

-   [RF gürültü tipleri](/tutorials/rf-gurultu-tipleri-bastirma) — PSU gürültüsü
-   [İlk telsiz satın alma](/tutorials/ilk-telsiz-satin-alma-rehberi)
-   [QRP düşük güç](/tutorials/qrp-dusuk-guc-operasyonu) — batarya besleme
-   [POTA/SOTA](/tutorials/pota-sota-aktivasyon-rehberi) — solar portable
-   [Araç telsiz anteni](/tutorials/arac-telsiz-anteni-secimi) — araç DC
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — güç kaynağı makaleleri
