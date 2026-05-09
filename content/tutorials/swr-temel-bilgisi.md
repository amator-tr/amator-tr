---
title: SWR (Standing Wave Ratio) Nedir? Telsizini Korumanın Bilimi
description: >-
  SWR (duran dalga oranı) nedir, neden önemli, nasıl ölçülür. Yansıyan güç,
  empedans uyumsuzluğu, SWR < 1.5 hedefi, bobin/feedline hataları, çözüm
  stratejileri.
keywords:
  - SWR
  - anten
  - ölçüm
  - başlangıç
article_section: SWR
published_at: '2026-04-26'
updated_at: '2026-04-26'
---
**SWR** (Standing Wave Ratio, "duran dalga oranı") amatör telsizcilikte en çok söz edilen ama en az anlaşılan terimlerden biri. Yanlış SWR = telsizinin final transistörü yanması = pahalı bir ders. Bu yazıda SWR'ın fiziği, ölçümü, tehlikeleri ve çözümü.

## Fizik: enerji nereye gider?

Telsiz vericisi RF gücü üretir. Bu güç bir koaksiyel kabloyla (besleme hattı) antene gider. Anten enerjiyi havaya yayar — IDEAL durum.

Ancak gerçekte:

-   Koaks ↔ anten arasında **empedans uyumsuzluğu** varsa, gücün bir kısmı **geri yansır**
-   Yansıyan güç koaks içinde "duran dalga" oluşturur (gidip gelen)
-   Standing wave ratio = (Vmax / Vmin) — koakstaki maksimum/minimum gerilim oranı

**1:1** = mükemmel uyum (yansıyan dalga sıfır, tüm güç antene). **2:1** = %11 yansıma. **3:1** = %25 yansıma. **6:1** = %50 yansıma.

## SWR neyle eşleşir?

Anten besleme noktası **empedans** ile koaks **karakteristik empedans** uyumlu olmalı:

-   **50Ω** — amatör radyo standartı (RG-58, RG-213, RG-8X koaksların hepsi 50Ω)
-   **75Ω** — TV/uydu kablosu (RG-6) — ama amatörde uyumsuz
-   Yarım dalga dipole serbest uzayda **~73Ω** — 50Ω'ya yakın, SWR ~1.5
-   Çeyrek dalga vertical **~36Ω** — SWR ~1.4
-   Folded dipole **~280Ω** — 4:1 balun gerekiyor

## SWR ne kadar tehlikeli?

| SWR | Yansıyan güç | Sonuç |
| --- | --- | --- |
| **1.0:1** | %0 | Mükemmel |
| **1.5:1** | %4 | Çok iyi, hedefe ulaştın |
| **2.0:1** | %11 | İyi, çoğu telsiz sorunsuz çalışır |
| **2.5:1** | %18 | Sınırda, modern telsizlerin foldback başlar |
| **3.0:1** | %25 | Sorunlu, bazı telsizler güç düşürür |
| **5.0:1** | %44 | TX yapma, final yanabilir |
| **10:1** | %67 | Tehlike — anti-rezonans, asla yayma |

Modern transceiver'lar (Yaesu FT-991A, Icom IC-7300 vb) içerideki **otomatik foldback** ile 3:1 üstünde gücü kısar — telsizi korur. Ama eski tüplü veya korumasız modüllerde finalleri yakar.

**Yansıyan güç ısı olur** — anten yerine final amplifier kızar. Birkaç dakika SWR>5 ile yayın yaparsanız transistör veya borç gider. Anten kopukken (open) veya koaks shortcircuit ise SWR ∞, hemen kapat.

## SWR nasıl ölçülür?

### 1\. SWR Metre (analog)

Klasik in-line cihaz — koaks hattının üstüne takılır, vericiyle anten arasında. İğne ileri/geri güç gösterir, formülle SWR. ~500-1500 TL.

**Kullanım:**

1.  Forward calibrate (FWD pozisyonunda iğneyi 100'e ayarla)
2.  REV'e geç, oradaki değeri oku
3.  SWR = (1 + reflected/forward) / (1 - reflected/forward)
4.  Bazı SWR metrelerde direkt SWR ibresi var

### 2\. NanoVNA (yeni, en doğru)

Vector network analyzer — frekansa göre SWR grafiği çizer. Sweep yapar, anten'in en iyi rezonans frekansını gösterir.

-   $50-150
-   Frekansa göre detaylı bilgi
-   Empedans (R+jX), Smith Chart
-   [Detaylı NanoVNA tutorial →](/tutorials/nanovna-anten-olcumu)

### 3\. Telsiz dahili

Çoğu modern transceiver'da SWR metre var. Hızlı kontrol için yeterli, hassas ölçüm değil.

## Sık SWR sorunları + çözüm

### Anten boyut hatası

**Belirti:** Hedef bantta SWR yüksek, fakat farklı frekansta düşük rezonans var. **Çözüm:** Boy hesaplayıcı ([anten hesaplayıcı tool](/araclar/anten-hesaplayici/)). Anten kısaysa rezonans yüksek freq'de, uzunsa düşük freq'de. Genelde her kanattan ~1-2 cm kes/ekle.

### Koaks zarar görmüş

**Belirti:** Aynı anten dün 1.5'tu, bugün 4.0. **Çözüm:** Koaksı çek, gözle inceleme — kıvrılma, kemirme (kediler!), su girişi, konnektör paslı. NanoVNA ile time-domain reflectometry hızlı tespit eder.

### Konnektör gevşek / paslı

**Belirti:** Hareket ederken SWR değişiyor. **Çözüm:** PL-259 / N konnektörlerini söküp temizle, lehim noktasını kontrol et, contact greaser uygula.

### Toprağa kötü bağlantı (vertical)

**Belirti:** ¼λ vertical anten yüksek SWR, çoklu bant geliyor. **Çözüm:** Radyaller ekle (en az 4, ideal 16+). Topraklama kalitesi vertical antenleri yapar veya bozar.

### Yakındaki metal yapı

**Belirti:** Çatıda SWR farklı, bahçede farklı. **Çözüm:** Anten metal çatıya/duvarına çok yakınsa empedans değişir. En az **¼λ** (2m'de 50cm) uzakta tut.

### Su / nem

**Belirti:** Yağmurdan sonra SWR bozulur. **Çözüm:** Konnektörleri **self-amalgamating tape** ile sar. PL-259 standart konnektör değil, N-type tercih et — daha iyi su yalıtımı. Drip loop yap (kabloyu cihaza girmeden bir loop yapsın, su damlasın).

### RFI (Common-mode current)

**Belirti:** SWR iyi ama bilgisayar/TV bozuluyor, mikrofona shock alıyorsun. **Çözüm:** **1:1 current balun** (current choke) ekle anten besleme noktasına. Common-mode RF'i bastırır.

## Anten tuner = SWR fix mi?

Hayır, **tuner SWR'ı saklar, çözmez**. Tuner = telsiz tarafında değişken kondansatör + bobin matrix'i, telsizin gördüğü SWR'i 1:1 yapar. Ama anten hâlâ uyumsuz, koaksta hâlâ standing wave var, **kayıp koaksta ısı olarak gidiyor**.

Tuner ne zaman OK:

-   Çoklu bant operasyon — tek dipole ile 80m+40m+20m
-   Random wire / EFHW

Tuner ne zaman değil:

-   Anten tasarımı yanlış — boyu çok yanlış, rezonans olmayan band
-   Koaksta hasar — tuner yansımayı saklar ama koaks zarar görmeye devam eder

İdeal: önce mekanik olarak doğru boyda anten yap, \*\*SWR < 2:1\*\*, ondan sonra tuner ile finetune. SWR > 3:1'i tuner ile maskelemek **uzun vadede koaks/telsiz öldürür**.

## Frekansa göre SWR davranışı

NanoVNA sweep ile gör:

-   **Düşük SWR genişliği** = anten kalitesi göstergesi. 2m'de 144-148 MHz aralığında SWR < 2 ideal
-   **Tek pik** = düzgün rezonans
-   **Multi-pik** = harmonikler veya yapısal sorun
-   Apex'ten 200 kHz uzaklıkta SWR 2'ye çıkıyorsa anten "dar bantlı" — tuning lazım

## Hızlı SWR sorun çözme akış şeması

```
SWR > 3 →
  - Anten boyu doğru mu? (anten hesaplayıcı kullan)
  - Koaks görünüm OK mi? (kıvrılma, hasar)
  - Konnektörler temiz/sıkı mı?
  - Yakında metal yapı var mı?
  - Anten ground plane var mı? (vertical için)
SWR 2-3 arası →
  - Boy fine-tune (1-2 cm)
  - Konnektör temizle, su yalıtımı
  - Bandpass dış sınırlarına yakınsan normal
SWR < 1.5 →
  - İyi, başka bantı dene
SWR 1.0 sürekli →
  - Şüphe duy: dummy load takılı mı? Anten gerçekten bağlı mı?
```

* * *

## İlgili kaynaklar

-   [NanoVNA ile anten ölçümü](/tutorials/nanovna-anten-olcumu) — adım adım kalibrasyon, sweep, Smith Chart
-   [Anten yapımı temel](/tutorials/anten-yapimi-temel) — J-Pole, Slim Jim
-   [HF dipole + EFHW](/tutorials/hf-dipole-efhw-anten)
-   [Anten boy hesaplayıcı](/araclar/anten-hesaplayici/) — frekansa göre boy
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — SWR makaleleri
