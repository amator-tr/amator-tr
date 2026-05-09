---
title: 'dB, dBi, dBd ve Anten Kazancı — "9 dBi" ne anlama gelir?'
description: >-
  Decibel (dB), dBi, dBd, dBm farklılıkları. Anten kazancının fiziksel anlamı,
  ERP/EIRP hesabı, "9 dBi anten" gerçekten ne kadar güç kazandırır?
keywords:
  - dB
  - dBi
  - dBd
  - anten kazancı
  - theory
article_section: dB
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Anten gain'i 30 dB" mümkün mü?
    a: >-
      Pratikte amatör için hayır. 30 dBi = parabolic dish 1-2m. Microwave (10
      GHz) bantlarda mümkün. HF/VHF'te 15 dBi maksimum.
  - q: Yüksek gain anten her zaman daha iyi mi?
    a: >-
      Hayır. Yüksek gain = dar lob = hassas yön ayarı. Mobile için tercih edilen
      düşük gain (omnidireksiyonel) çünkü hareket halindesin. Sabit DX için
      yüksek gain Yagi.
  - q: 5W vs 100W" gerçekten 13 dB fark mı?
    a: >-
      Evet, ama fading + receiver hassasiyetiyle her zaman 13 dB fark görünmez.
      FT8 modunda 5W ile yapılan kontak 100W'tan farkı belirsiz olabilir (-25 dB
      SNR limitinde dijital decode aynı).
  - q: Smith chart'tan kazanç bulabilir miyim?
    a: >-
      Hayır, Smith chart empedans gösterir, kazanç değil. Kazanç için antenna
      pattern plot (azimuth + elevation desen) lazım. ---
---
"5 dBi gain anten" reklamına bakıyorsun. 5 dB ne kadar — 5 watt mı, 5 katı mı? "Bu anten 9 dBd, diğeri 12 dBi, hangisi daha iyi?" Bu yazı **decibel (dB)** ve anten kazancı ölçülerinin matematiği + pratik karşılığı.

## dB nedir?

**Decibel** = logaritmik orantı ölçüsü. İki büyüklüğün birbirine oranını ifade eder.

$ dB = 10 \\log\_{10}\\left(\\frac{P\_1}{P\_2}\\right) $

Bu formülün üç önemli sonucu:

-   **3 dB = 2 katı** (güç bazında)
-   **6 dB = 4 katı**
-   **10 dB = 10 katı**
-   **20 dB = 100 katı**
-   **30 dB = 1000 katı**

### Pratik kural

> Her **3 dB artış**, gücün **2 katına** çıktığını ifade eder.

## Mutlak ölçüler: dBm, dBW

Sadece "5 dB" anlamsız çünkü neye göre kıyas? **Referansla** anlam kazanır:

### dBm — referans 1 milliwatt

-   0 dBm = 1 mW
-   30 dBm = 1 W
-   60 dBm = 1 kW
-   \-100 dBm = 0.0000000001 mW (ham radio receiver hassasiyeti)

### dBW — referans 1 watt

-   0 dBW = 1 W
-   20 dBW = 100 W
-   30 dBW = 1 kW

## Anten kazancı: dBi ve dBd

Anten "kazancı" = belli bir referansla karşılaştırma. İki standart referans:

### dBi — izotropik anten

-   **İzotropik anten** = teorik mükemmel anten, tüm yönlere eşit yayar
-   Gerçekte yapılamaz (sadece matematik konstrukt)
-   Standart bilimsel referans

### dBd — yarım dalga dipole

-   **½λ dipole** = pratik gerçek bir anten
-   Pratik amatör radyo referansı

### Dönüşüm

> dBd = dBi - 2.15

Yani dipole'un kendisi izotropic referansla **2.15 dBi** kazançtır. Onu 0 dBd kabul ettiğimizde diğer antenler buna göre ölçülür.

### Örnek

-   Yagi 3-element antenin kazancı **6 dBd** veya **8.15 dBi** (aynı şey)
-   "9 dBi vertical" = 6.85 dBd
-   Eğer üretici "12 dBi" diyorsa = 9.85 dBd

**Tüccar trick**: dBi sayısı dBd'den 2.15 büyük olduğundan, marketing'de dBi tercih edilir — daha etkileyici görünür.

## Anten kazancı fiziksel anlamı

"6 dBi gain" demek **anteni 4 kat güçlendiriyor değil**. Anten enerji üretmiyor — sadece **belirli yöne yoğunlaştırıyor**.

### İzotropik anten

-   Tüm yönlere eşit yayar
-   Toplam güç korunur (enerji conservation)

### Direksiyonel anten (Yagi gibi)

-   Belirli yöne **daha çok**, başka yönlere **daha az**
-   6 dBi gain = ön loba 4 kat güç (ama arka 1/4 kat)
-   Toplam güç hâlâ aynı

### Pratik karşılık

-   6 dBi yagi + 100W TX → ön lob hedefte **400W eşdeğer ERP**
-   Ama yan/arka yönlerde **25W eşdeğer**
-   Hedef yöndeki sinyal: 400W vericiye eşdeğer

## ERP ve EIRP

### ERP (Effective Radiated Power)

**Dipole referansla** efektif güç: $ ERP = P\_{TX} \\times G\_{dBd} $

100W vericisi + 6 dBd Yagi → **400W ERP**

### EIRP (Effective Isotropic Radiated Power)

**İzotropik referansla**: $ EIRP = P\_{TX} \\times G\_{dBi} $

100W + 8.15 dBi Yagi → **653W EIRP** (ERP × 1.64)

### Türkiye yasal sınır

BTK yönetmeliği:

-   A sınıfı: **1500W ERP** maksimum
-   B sınıfı: **250W ERP**
-   C sınıfı: **25W ERP**

Anten kazancı **TX güç limitlerini etkilemez**, ERP limitini etkiler. 250W TX + 6 dBd Yagi = 1000W ERP → **B sınıfında yasal değil!**

## Pratik anten kazançları

| Anten | Tipik Gain |
| --- | --- |
| 1/4 wave vertical (4 radyalle) | 0-1 dBi |
| 1/2 wave dipole | 2.15 dBi (= 0 dBd) |
| Folded dipole | 2.15 dBi |
| 3-element Yagi | 7-8 dBi |
| 5-element Yagi | 9-10 dBi |
| 8-element Yagi | 11-12 dBi |
| 16-element Yagi long boom | 14-15 dBi |
| Parabolic 1m (10 GHz) | ~30 dBi |
| Helix antenna | 8-15 dBi |
| Whip car antenna | \-3 to 0 dBi |

### Üretici reklamlarına şüphe

-   **"15 dBi mobile whip"** → genelde 5-7 dBi'nin abartısı, marketing
-   Gerçek mobile vertical 0-3 dBi
-   Diamond X-30 üretici 6.5 dBi der → gerçekçi 4-5 dBi

## Telsiz başında zihinden hesaplama

Karmaşık formüllere gerek yok — sadece **iki sihirli rakam** (3 ve 10) ile tüm kazanç/kayıp hesabını kafadan yapabilirsin:

| dB değişimi | Güç etkisi |
| --- | --- |
| **+3 dB** | Gücü **2 ile çarp** |
| **\-3 dB** | Gücü **2'ye böl** |
| **+10 dB** | Gücü **10 ile çarp** |
| **\-10 dB** | Gücü **10'a böl** |

### Pratik örnek 1: anten kazancı

Telsizin 5W çıkış veriyor. 6 dBi kazançlı anten taktın. Efektif güç?

-   6 dB = 3 + 3 (iki kez iki katına çık)
-   5W × 2 = 10W (ilk 3 dB)
-   10W × 2 = **20W** (ikinci 3 dB)

### Pratik örnek 2: kablo kaybı

100W çıkışın var, kabloda 10 dB kayıp. Antene ne ulaşır?

-   \-10 dB kuralı: 100W / 10 = **10W**
-   Enerjinin **%90'ı kabloda ısıya dönüştü** — kötü kablo!

### Pratik örnek 3: kombine

50W TX + 3 dB kablo kayıp + 9 dBi anten:

-   Kablo sonrası: 50W / 2 = 25W
-   Anten sonrası: 9 dBi ≈ 3+3+3 = 8x (yaklaşık)
-   25W × 8 = **200W EIRP**

Bu "3 ve 10" kuralı cebindeki en büyük kopya kağıdı — sınavda da, sahada da çalışır.

## 3 dB kuralı pratik kullanım (detay)

Sinyal seviyesi dB cinsinden ifade edilir → matematik kolay:

### Path loss

-   Mesafe 2 katına çıkınca **6 dB sinyal kaybı** (free space)
-   2x daha uzak antenle aynı sinyal almak için **+6 dB anten kazancı veya 4x güç**

### Kayıp ve kazanç toplama

-   100W TX + 3 dB kablo kayıp + 6 dB anten kazancı = 200W ERP eşdeğeri
-   (10 dB - 3 dB + 6 dB = 13 dB → 200W)

### S-meter

Hatırla: S-meter scale'inde her S unit = 6 dB

-   S5 → S6 = +6 dB = 4x güç
-   S5 → S9 = +24 dB = ~256x güç

## RF güç hesabı (pratik örnek)

100W telsiz + 30m RG-213 + 6 dBd 3-element Yagi @ 145 MHz:

1.  TX power: 100W = 50 dBm
2.  Coax loss: 0.8 dB/10m × 3 = 2.4 dB
3.  Anten input: 50 - 2.4 = 47.6 dBm = 57.5W
4.  Anten ERP: 57.5W × 4 (6 dBd) = 230W ERP
5.  EIRP: 230 × 1.64 = 377W EIRP

Yasal kontrol:

-   B sınıfı limit 250W ERP → 230W limit altı OK
-   A sınıfı 1500W → kolay altı

## SNR ve link budget

İki nokta arasında haberleşme yapabilir misin? Link budget hesabı:

$ SNR\_{rx} = P\_{TX} + G\_{TX} - L\_{path} - L\_{cable} + G\_{RX} - N $

-   P\_TX = verici gücü (dBm)
-   G\_TX = vericiye anten kazancı (dBi)
-   L\_path = mesafe kaynaklı kayıp (free space + atmosferik)
-   L\_cable = koaks kayıp
-   G\_RX = alıcı anten kazancı
-   N = receiver gürültü tabanı

Pozitif SNR → kontak yapılabilir. **\>10 dB** ideal.

## Receiver hassasiyeti

Modern transceiver receiver hassasiyeti **\-130 ile -140 dBm** (FT8 -150 dBm decode). Birçok faktöre bağlı:

-   LNA (low noise amplifier) gain + noise figure
-   Filter
-   Antenden gelen gürültü (urban vs rural)

## Sık sorulan sorular

### "Anten gain'i 30 dB" mümkün mü?

Pratikte amatör için hayır. 30 dBi = parabolic dish 1-2m. Microwave (10 GHz) bantlarda mümkün. HF/VHF'te 15 dBi maksimum.

### Yüksek gain anten her zaman daha iyi mi?

Hayır. Yüksek gain = dar lob = hassas yön ayarı. Mobile için tercih edilen düşük gain (omnidireksiyonel) çünkü hareket halindesin. Sabit DX için yüksek gain Yagi.

### "5W vs 100W" gerçekten 13 dB fark mı?

Evet, ama fading + receiver hassasiyetiyle her zaman 13 dB fark görünmez. FT8 modunda 5W ile yapılan kontak 100W'tan farkı belirsiz olabilir (-25 dB SNR limitinde dijital decode aynı).

### Smith chart'tan kazanç bulabilir miyim?

Hayır, Smith chart **empedans** gösterir, kazanç değil. Kazanç için **antenna pattern plot** (azimuth + elevation desen) lazım.

* * *

## İlgili kaynaklar

-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [NanoVNA ile ölçüm](/tutorials/nanovna-anten-olcumu)
-   [Anten yapımı temel](/tutorials/anten-yapimi-temel)
-   [Yagi anten yapımı](/tutorials/yagi-anten-yapimi)
-   [Koaksiyel kablo seçimi](/tutorials/koaksiyel-kablo-secimi)
-   [İyonosfer katmanları](/tutorials/ionosfer-katmanlari-detay) — link budget
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — dB makaleleri
