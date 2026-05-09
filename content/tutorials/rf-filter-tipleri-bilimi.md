---
title: 'RF Filtreler — Alçak, Yüksek, Bant Geçiren ve Notch'
description: >-
  RF filtre çeşitleri — Low-Pass (LPF), High-Pass (HPF), Band-Pass (BPF), Notch.
  Harmonik bastırma, RFI önleme, anten front-end filtreleme, DIY filtre yapımı.
keywords:
  - filter
  - LPF
  - HPF
  - BPF
  - notch
  - harmonik
  - theory
article_section: filter
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: Her telsizde LPF var mı?
    a: >-
      Modern transceiver'larda dahili LPF var. Homebrew / kit vericilerde yok →
      harici LPF zorunlu.
  - q: BPF alıcıya zarar verir mi?
    a: 'Hayır — pasif cihaz, sinyal bastırır. Kayıp 0.3-1 dB, zararsız.'
  - q: Filtre ile "duplexer" aynı mı?
    a: >-
      Duplexer = iki BPF birleşik (2m + 70cm ayrımı tek antenle). Filtre
      prensibi aynı, uygulama farklı.
  - q: En ucuz RFI çözüm filtre mi?
    a: >-
      Hayır — ferrit choke daha ucuz ve pratik. Filtre daha spesifik, güçlü
      sorunlar için.
  - q: Hangi filtre sipariş vereceğimi nasıl bileyim?
    a: >-
      - Sorun harmonik (komşu TV) → LPF - Sorun broadcast interferans → HPF veya
      BPF - Sorun tek frekans parazit → notch - Emin değilsen → RF gürültü
      tutorial ---
---
Telsizin 7 MHz'de konuşurken aslında 14 MHz, 21 MHz, 28 MHz'de de sinyal üretiyor — bunlar **harmonikler**. Bu davetsiz misafirleri kapı dışarı etmezsen, komşunun TV ekranında parazit olursun. Çözüm: **filtreler**. 1915'ten beri radyo dünyasının en önemli yapı taşı.

## Filtre nedir?

Belirli frekans aralığını **geçiren** veya **engelleyen** L (bobin) + C (kondansatör) devresi. Farklı frekanslara "dur" veya "geç" der.

### Tarihçe

1915'te George Campbell ve Karl Wagner birbirinden bağımsız olarak LC filtre teorisini geliştirdi — telefon hatlarındaki farklı ses frekanslarını ayırmak için. Amatör telsizcilikte filtreler radyo spektrumunu düzenli hale getirdi.

## 4 temel filtre tipi

### 1\. Alçak Geçiren Filtre (Low-Pass Filter — LPF)

**Mantık:** Kesim frekansının altını geçirir, üstünü engeller.

**Kullanım:** Her HF telsizin **çıkışında** standart — verici harmoniklerini bastırır.

-   30 MHz LPF → HF sinyali geçer, 60 MHz TV bantı harmonikleri yok edilir
-   Türkiye yönetmeliği: harmonic emisyon ≤ -40 dBc (carrier'ın 40 dB altı)

**Pratik:** Eğer TX yaparken komşunun TV'si bozuluyorsa → koaks hattına **LPF** tak, harmonikler bastırılır.

**Tipik ürünler:**

-   **MFJ-704** ($80) — 1.5 kW, 200W average
-   **Diamond SX-200** ($50) — 200W
-   DIY: 7-element Chebyshev LPF (5 bobin + 2 kondansatör) ~100 TL malzeme

### 2\. Yüksek Geçiren Filtre (High-Pass Filter — HPF)

**Mantık:** Kesim frekansının altını engeller, üstünü geçirir.

**Kullanım:** Genelde **alıcı girişinde**. Yakında güçlü AM broadcast istasyonu (540-1700 kHz) varsa ve telsizi "sağır" ediyorsa → HPF ile düşük frekans gürültüsü süzülür.

**Pratik:**

-   Evin yakınında MW broadcast verici → 30 MHz HPF anten girişine → HF bantlarında AM gürültü kaybolur
-   TV antenine HPF takarak ham radio vericisinin 14 MHz sinyalini TV'den uzak tut

### 3\. Bant Geçiren Filtre (Band-Pass Filter — BPF)

**Mantık:** Sadece belirli **frekans penceresini** açık bırakır, hem altını hem üstünü keser.

**Kullanım:** İstenmeyen sinyalleri izole et, sadece çalışma bandını geçir.

**Pratik örnekler:**

-   **144-148 MHz BPF** → 2m bandı sadece. FM broadcast (88-108 MHz) bastırılır
-   **7.0-7.3 MHz BPF** → 40m bandı izole. Yakın broadcast + diğer amatör bantlar filtrelenir
-   **Receiver front-end**: güçlü yakın sinyal (broadcast tower) receiver'ı overload ediyorsa → BPF ile sadece çalışma bandı alınır

**Ürünler:**

-   **DX Engineering NCC-2** ($400) — 160-10m switched BPF, premium
-   **W3NQN** band-pass filter seti — klasik homebrew design
-   **Mini-Circuits** BPF modülleri — endüstriyel

### 4\. Notch Filtre (Çentik Filtre)

**Mantık:** Tek bir frekansı **bastırır**, geri kalanı geçirir (BPF'in tersi).

**Kullanım:** Spesifik parazit kaynağını öldür — bilinen interferans frekansı.

**Pratik:**

-   Yakındaki ticari radyo istasyonu (belirli frekans) sürekli interference yapıyor → notch o frekansa ayarla
-   Telsiz dahili notch filter (IC-7300 DSP notch) → CW bantlarında tek tonlu parazit bastırma
-   **Auto-notch**: modern telsizlerde otomatik — tonu algılar, bastırır

## Filtre parametreleri

### Kesim frekansı (cutoff, fc)

\-3 dB noktası — sinyalin yarı güce düştüğü frekans.

### Yuvarlama (roll-off)

Filtrenin kesim sonrası ne kadar hızlı bastırdığı:

-   **1\. derece**: -6 dB/octave (yavaş)
-   **3\. derece**: -18 dB/octave
-   **5\. derece**: -30 dB/octave
-   **7\. derece**: -42 dB/octave (çok keskin)

Daha yüksek derece = daha iyi bastırma, ama daha fazla bileşen + kayıp.

### Ripple (dalgalanma)

Geçirme bandındaki düzensizlik:

-   **Butterworth**: düz passband, yavaş roll-off
-   **Chebyshev**: passband'de ripple var ama çok keskin roll-off
-   **Elliptic (Cauer)**: en keskin ama en çok ripple

Amatör radyo'da **Chebyshev** en yaygın — ripple 0.5 dB tolere edilir, roll-off iyi.

### Insertion loss

Filtrenin **geçirme bandındaki** kayıp. İyi filtre 0.1-0.5 dB, kötü filtre 1-2 dB.

## Nerede filtre gerekir?

### Verici çıkışı → LPF (zorunlu)

-   Harmonik emisyon bastırma
-   Yönetmelik gereği
-   Modern telsizlerde dahili LPF var, ama eski/homebrew vericilerde harici gerek

### Alıcı girişi → BPF veya HPF (önerilen)

-   Güçlü yakın broadcast → receiver overload → BPF ile izole
-   FM broadcast (88-108 MHz) interferans → HPF

### Anten hattında → notch (spesifik sorun)

-   Bilinen tek frekans parazit → notch

### Dijital mod → LPF (audio)

-   Bilgisayar ses kartı çıkışında düşük frekanslı hum varsa audio LPF

## DIY filtre yapımı

### 7-element LPF (30 MHz cutoff, Chebyshev)

**Malzeme:**

-   4× toroid bobin (T-50-6 veya T-68-6)
-   3× gümüş mika kondansatör (NP0/C0G)
-   2× SO-239 konnektör
-   Bakır kaplamalı PCB (ground plane)

**Tasarım:**

-   [ELSIE](http://www.tonnesoftware.com/elsie.html) veya [RFSim99](http://www.rfsim99.com/) ücretsiz yazılımla hesapla
-   Chebyshev 0.5 dB ripple, 50Ω, 30 MHz cutoff
-   Bileşen değerleri otomatik çıkar

**Yapım:**

1.  PCB üzerine konnektörler monte
2.  Toroid'lere hesaplanan sarım sayısında tel sar
3.  Kondansatörler seri/paralel düzen
4.  Lehim
5.  NanoVNA ile **insertion loss** + **return loss** ölç

**Maliyet:** ~200 TL (hazır filtre 3000 TL+)

## Filtre vs tuner farkı

|  | Filtre | Tuner |
| --- | --- | --- |
| **Amaç** | İstenmeyen frekans bastır | Empedans eşleştir |
| **Frekans seçici** | Belirli bantı geçir/bastır | Empedansı 50Ω'a dönüştür |
| **Kayıp** | 0.1-1 dB | 0.5-2 dB |
| **Yapı** | Sabit L+C | Ayarlanabilir L+C |

Filtre "neyi dinleyeceğini/göndereceğini" seçer, tuner "uyumu" sağlar. İkisi farklı iş.

## Modern telsizlerde dahili filtreler

### IC-7300 / FT-991A gibi SDR transceiver'lar

-   **Roofing filter**: IF (ara frekans) katında dar BPF
-   **DSP filter**: yazılım tabanlı, ayarlanabilir BW (100 Hz — 3 kHz)
-   **Auto-notch**: DSP ile otomatik parazit bastırma
-   **Noise blanker**: pulse noise (motor) bastırma

Bu dahili filtreler çoğu durumu çözer. Harici filtre sadece:

-   Receiver overload (güçlü yakın sinyal)
-   Verici harmonic bastırma (homebrew / eski telsiz)
-   Spesifik RFI problemi

## Sık sorulan sorular

### Her telsizde LPF var mı?

Modern transceiver'larda dahili LPF var. Homebrew / kit vericilerde yok → **harici LPF zorunlu**.

### BPF alıcıya zarar verir mi?

Hayır — pasif cihaz, sinyal bastırır. Kayıp 0.3-1 dB, zararsız.

### Filtre ile "duplexer" aynı mı?

Duplexer = iki BPF birleşik (2m + 70cm ayrımı tek antenle). Filtre prensibi aynı, uygulama farklı.

### En ucuz RFI çözüm filtre mi?

Hayır — **ferrit choke** daha ucuz ve pratik. Filtre daha spesifik, güçlü sorunlar için.

### Hangi filtre sipariş vereceğimi nasıl bileyim?

-   Sorun harmonik (komşu TV) → **LPF**
-   Sorun broadcast interferans → **HPF** veya **BPF**
-   Sorun tek frekans parazit → **notch**
-   Emin değilsen → [RF gürültü tutorial](/tutorials/rf-gurultu-tipleri-bastirma)

* * *

## İlgili kaynaklar

-   [RF gürültü tipleri + bastırma](/tutorials/rf-gurultu-tipleri-bastirma) — gürültü kaynak tespit
-   [SWR temel](/tutorials/swr-temel-bilgisi)
-   [RF amplifier sınıfları](/tutorials/rf-amplifier-siniflari) — harmonik üretimi
-   [Empedans matching matematik](/tutorials/empedans-matching-matematik) — L+C devre
-   [Spectrum analyzer ölçüm](/tutorials/spectrum-analyzer-amator-olcum) — filtre test
-   [Apartmanda amatör telsizcilik](/tutorials/apartmanda-amator-telsizcilik) — RFI çözüm
-   ELSIE filter design: [tonnesoftware.com](http://www.tonnesoftware.com/elsie.html)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — filtre makaleleri
