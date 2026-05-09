---
title: 'Balun Yapımı (1:1, 4:1, 9:1, 49:1) — Ferrit Toroid DIY Rehberi'
description: >-
  Amatör radyo balun (Bal-Un) ve unun (Un-Un) yapımı. 1:1 current choke, 4:1
  voltage balun, 9:1 random wire, 49:1 EFHW. FT-240-43 toroid, sarım hesabı,
  lehim teknikleri.
keywords:
  - balun
  - unun
  - anten
  - EFHW
  - ferrit
  - DIY
article_section: balun
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Choke ile balun aynı şey mi?
    a: >-
      Choke = sadece common-mode bastırma (1:1). Balun = empedans dönüşümü
      ve/veya CMC bastırma. 1:1 current balun aslında bir choke.
  - q: Balun ile balanced bir empedans?
    a: >-
      Yanlış kullanım. Balun balanced ↔ unbalanced dönüşümü yapar. Empedans
      oranı (1:1, 4:1) ayrı bir özellik.
  - q: Powdered iron vs ferrit?
    a: >-
      Ferrit = yüksek permeabilite, kayıp az. Powdered iron = düşük perm, yüksek
      güç. Amatör radyo için ferrit Mix-43 standart.
  - q: Ferritimi kontrol etmem gerek mi?
    a: >-
      - TX sırasında ısınmıyorsa OK - Ölçümde SWR hata yapıyorsa muhtemelen
      saturated - AC voltmeter koaks dış yüzeyinde RF akım gösteriyorsa CMC,
      sarım az
  - q: 'EFHW antene 49:1 mi 64:1 mi?'
    a: >-
      49:1 standartı (2450Ω → 50Ω). Bazı operatörler 64:1 tercih eder (4096Ω →
      64Ω). 49:1 yaygın, dokümantasyon çok. ---
---
Antenden gelen koaksiyel kabloyu doğrudan dipole'a bağlayamazsın. 50Ω koaks (unbalanced) ↔ dipole (balanced) arasında dengesizlik var → common-mode current → RFI + zayıf pattern. Çözüm: **balun**. Bu rehber 4 yaygın balun türünün DIY yapımı + ferrit toroid seçimi + sarım hesabı.

## Balun nedir, neden gerekli?

**Bal-Un** = **Bal**anced + **Un**balanced. Balun, iki farklı elektromanyetik dünyayı birbirine **tercüme eden** küçük, gizemli bir kutudur. Balanced dünya (dipole) ile unbalanced dünya (koaks) arasında köprü kurar. Bu köprü olmazsa akım yanlış yoldan döner, anten olmaması gereken yerde anten gibi davranır.

### Sinyal türleri

-   **Balanced**: dipole (iki ucu eşit, yer referansı yok)
-   **Unbalanced**: koaks (iç iletken sinyal, dış shield ground)

İkisini direkt bağlarsan:

-   Koaks shield'inden RF dış yüzeyde geri akar → **common-mode current** (CMC)
-   Pattern bozulur — dipole 8 şekli yerine asimetrik
-   RFI artar — koaks anten gibi davranır, ev içinde radyasyon
-   SWR ölçümleri yanıltıcı

### Balun çözümü

-   Common-mode bastırır — RF sadece anten elemanına gider
-   Empedans dönüşümü (4:1, 9:1 gibi)
-   Operatöre RF shock korumalı

### Unun

**Un-Un** = **Un**balanced + **Un**balanced. Empedans dönüşümü ama balanced değil. Random wire, EFHW için kullanılır.

## 4 yaygın tip

### 1:1 Current Balun (Choke)

-   **Görev:** Common-mode current bastırma
-   **Empedans:** 50Ω → 50Ω (dönüşüm yok)
-   **Kullanım:** Dipole, V-beam, loop — feedline'ı izole et
-   **DIY:** Ferrit toroid + 8-12 sarım koaks

### 4:1 Voltage Balun

-   **Görev:** Yüksek empedans antenler için
-   **Empedans:** 200Ω → 50Ω
-   **Kullanım:** Folded dipole, off-center fed (OCF), Carolina Windom
-   **DIY:** Ferrit toroid + 6+6 bifilar sarım

### 9:1 Unun (Magnetic Long Wire)

-   **Görev:** Çok yüksek empedans çoklu bant
-   **Empedans:** 450Ω → 50Ω
-   **Kullanım:** Random wire (rastgele uzunluk tel anten)
-   **DIY:** Ferrit toroid + 3+1 trifilar sarım

### 49:1 EFHW Unun

-   **Görev:** Yarım dalga end-fed
-   **Empedans:** 2450Ω → 50Ω
-   **Kullanım:** EFHW (End-Fed Half-Wave) antenler — POTA/SOTA favorisi
-   **DIY:** Ferrit toroid + 14+2 sarım

## Ferrit toroid seçimi

Ferrit toroid = balun'un kalbi. Yanlış seçim = kayıp + ısınma.

### Ferrit "mix" (karışım)

-   **Mix 31** — düşük frekans, yüksek bastırma. 1-30 MHz iyi
-   **Mix 43** — orta frekans, en yaygın amatör. **3-50 MHz altın çağı**
-   **Mix 61** — yüksek frekans (50-300 MHz). VHF baluns
-   **Mix 77** — düşük güç + filter applications

### Boyut

-   **FT-50-43** — küçük, ≤25W
-   **FT-114-43** — orta, ≤100W
-   **FT-140-43** — orta-büyük, ≤200W
-   **FT-240-43** — **standart yüksek güç (≤500W)**, EFHW için ideal
-   **FT-290-43** — büyük, ≤1500W
-   2x FT-240 stacked — ≤1500W çok güvenli

### Pratik tercih

**FT-240-43** = amatör radyo için "default". Tüm 4 tip balun'da çalışır, 100W güvenli, 500W tolere.

## Sarım hesabı + adım adım

### 1:1 Current Balun (en kolay)

**Malzeme:**

-   1× FT-240-43 toroid
-   2.5m RG-58 veya RG-8X koaks
-   2× SO-239 (PL-259) konnektör
-   Plastik / PVC kutu (~10×10×5 cm)

**Sarım:**

-   Toroid'in etrafına **8-10 sarım koaks**
-   Sarımları **eşit dağıt** (bunching = kayıp)
-   Koaks orta yerine sarım, uçlar dışarı

**Yapım:**

1.  Koaksın iki ucunu PL-259/SO-239'a lehimle
2.  Koaksın orta kısmını toroid'in etrafına 8-10 sarım sar
3.  Plastik kutu içine yerleştir
4.  SWR meter ile test — 1.0:1 olmalı (50Ω geçiş)

### 4:1 Voltage Balun (Guanella)

**Malzeme:**

-   1× FT-240-43
-   ~2m enamellid bakır tel (1.5 mm)
-   2× konnektör

**Sarım:**

-   **Bifilar** (iki tel paralel sarılmış) 6 sarım
-   İki tel uçları çapraz bağlanır

```
Giriş +     Çıkış 1+
   ▲          ▲
Tel-A    Tel-B
   ▼          ▼
Giriş GND   Çıkış 1- = Çıkış 2+
              (paralel bağlı)
```

Detaylı şema FT-240-43 4:1 balun design referansları ile.

### 9:1 Unun (Random Wire)

**Sarım:**

-   **Trifilar** (üç tel paralel) 7-9 sarım
-   Üç tel: A, B, C
-   Bağlantı:
    -   Giriş +: A başı
    -   Giriş -: C sonu
    -   Çıkış (random wire): B başı
    -   GND: C başı + B sonu + A sonu (paralel)

### 49:1 EFHW Unun (en popüler)

**Malzeme:**

-   1× FT-240-43 (veya 2× stacked yüksek güç için)
-   1.5m enamel bakır tel 1.5mm
-   1× SO-239 konnektör
-   1× M5 cıvata (anten teli bağlantı)

**Sarım:**

-   **Primer:** 2 sarım (giriş tarafı)
-   **Sekonder:** 14 sarım (anten tarafı)
-   Otomatik transformatör — tek tel, ayrı dönüşler

**Bağlantı:**

1.  Tel'i toroid'in etrafına başlat
2.  2 sarım sonra **tap point** — buradan SO-239 inner pin'e
3.  14 sarım daha → tel'in sonu **anten teline**
4.  SO-239 dış pin (shield) → balun toprak (capacitor, opsiyonel 100 pF parallel)

**Anten boyu:** Bandın yarım dalga uzunluğunda (40m için 20m, 20m için 10m, vs)

## Tarihçe + isim

Bal-Un kelimesi 1940'ların telekomünikasyon mühendislerinden geliyor — Bell Labs Hewlett Packard kataloglarında ilk kez geçiyor. Amatör radyoya 1960'larda Lewis McCoy (W1ICP) yazıları ile yayıldı.

## Test ve doğrulama

### NanoVNA ile test

1.  Balun'u terminate (50Ω dummy load anten tarafı)
2.  NanoVNA S11 ölçer (giriş tarafı)
3.  SWR < 1.5 → balun çalışıyor
4.  Bant sweep — geniş bantlı olmalı (1-30 MHz)

### CMC test

1.  Balun'la dipole bağla, koaksta ferrit clamp meter (RF clamp)
2.  TX → koaksın dış yüzeyinde RF akım ölçülmemeli (ideal sıfır)
3.  Eğer akım varsa → CMC mevcut, daha fazla sarım ekle

### Power test

-   Düşük güçle başla (5W)
-   Yavaşça artır (25W → 100W)
-   30 saniye TX, ferrit elinle dokun: **ısınmamalı** (>50°C zarar)
-   Hot ferrit = kayıp (verim düşüyor) veya saturation (yapı bozuluyor)

## Sık yapılan hatalar

### Yanlış mix

-   VHF (2m) için Mix-31 kullanma — Mix-61 lazım
-   1.8 MHz için Mix-43 sınırda — Mix-31 daha iyi

### Yetersiz sarım

-   1:1 choke'da 4 sarım yeter sayma — 8-12 olmalı
-   Az sarım = düşük frekansta CMC bastırma zayıf

### Tek toroid yetersiz güç

-   100W EFHW'de FT-240-43 OK
-   500W için 2 toroid stacked
-   1500W için 3-4 toroid

### Bunching

-   Sarımlar bir arada (kümeli) olmamalı
-   Eşit dağıtım ile L (indüktans) maksimum

### Lehim

-   Soğuk lehim = mekanik gevşeklik + RF kaybı
-   60/40 tin-lead lehim, temiz uç, iyi ısı

## Hazır balun (alternatif)

DIY zor / zaman yok? Hazır:

| Marka | Tip | Güç | Fiyat |
| --- | --- | --- | --- |
| **MFJ-918** | 1:1 | 1500W | ~$80 |
| **MFJ-912** | 4:1 | 1500W | ~$100 |
| **MyAntennas EFHW-8010** | 49:1 EFHW | 1000W | ~$150 |
| **Sotabeams 49:1** | EFHW QRP | 50W | ~$50 |
| **DXEngineering** | 1:1 BIG choke | 5000W | ~$300 |

Türkiye'de ham radio dükkanlarından bulunabilir. AliExpress'te ucuz Çinli baluns var ama kaliteleri tutarsız.

## Sık sorulan sorular

### Choke ile balun aynı şey mi?

Choke = sadece common-mode bastırma (1:1). Balun = empedans dönüşümü ve/veya CMC bastırma. 1:1 current balun aslında bir choke.

### "Balun ile balanced bir empedans?"

Yanlış kullanım. Balun **balanced ↔ unbalanced** dönüşümü yapar. Empedans oranı (1:1, 4:1) ayrı bir özellik.

### Powdered iron vs ferrit?

**Ferrit** = yüksek permeabilite, kayıp az. **Powdered iron** = düşük perm, yüksek güç. Amatör radyo için **ferrit Mix-43** standart.

### Ferritimi kontrol etmem gerek mi?

-   TX sırasında ısınmıyorsa OK
-   Ölçümde SWR hata yapıyorsa muhtemelen saturated
-   AC voltmeter koaks dış yüzeyinde RF akım gösteriyorsa CMC, sarım az

### EFHW antene 49:1 mi 64:1 mi?

49:1 standartı (2450Ω → 50Ω). Bazı operatörler **64:1** tercih eder (4096Ω → 64Ω). 49:1 yaygın, dokümantasyon çok.

* * *

## İlgili kaynaklar

-   [HF dipole + EFHW anten](/tutorials/hf-dipole-efhw-anten) — 49:1 unun kullanımı
-   [Anten yapımı temel](/tutorials/anten-yapimi-temel) — 1:1 balun ihtiyacı
-   [Yagi anten yapımı](/tutorials/yagi-anten-yapimi) — folded dipole 4:1
-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [NanoVNA ile ölçüm](/tutorials/nanovna-anten-olcumu) — balun test
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — balun makaleleri
