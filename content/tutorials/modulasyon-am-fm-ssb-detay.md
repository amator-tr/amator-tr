---
title: 'Modülasyon Türleri — AM, FM, SSB, CW Detaylı Karşılaştırma'
description: >-
  Amatör radyo modülasyon türleri — AM (genlik), FM (frekans), SSB (tek yan bant
  USB/LSB), CW (mors), AFSK. Bantgenişliği, verim, kullanım alanı, hangi bantta
  hangisi.
keywords:
  - modülasyon
  - AM
  - FM
  - SSB
  - CW
  - başlangıç
article_section: modülasyon
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: 'Telsizimde "FM" + "FM-N" var, fark nedir?'
    a: >-
      FM-N = Narrow FM, ±2.5 kHz deviation, 12.5 kHz BW. Modern röleler için
      standart. FM (wide) = ±5 kHz, 25 kHz BW, eski analog TV ses gibi geniş.
  - q: Aynı frekansta hem SSB hem FM dinleyebilir miyim?
    a: >-
      Hayır, modu seçmek zorundasın. SSB modunda FM sinyali "buzz" gibi gelir,
      FM modunda SSB sinyali Donald Duck.
  - q: USB ve LSB nereden gelir?
    a: >-
      Carrier'ın üstündeki sideband = USB, altındaki = LSB. SSB ekipmanı
      carrier'i bastırır + bir sideband'i seçer.
  - q: CW'de mors hız?
    a: >-
      - Yeni başlayan: 5-12 wpm - Orta: 15-20 wpm - Pro: 25-40 wpm - Contest
      super: 40+ wpm
  - q: Hangi bant hangi mod?
    a: >-
      - 2m/70cm: FM (röle), SSB (DX) - 80m/40m: SSB (LSB) + CW - 20m: SSB (USB)
      + CW + FT8 - 6m: All modes (AM, FM, SSB, CW, FT8) ---
---
Telsizinin VFO'sunu çevirirsen **mod düğmesi** ne işe yarar? Aynı frekansta SSB modunda Donald Duck konuşur, FM'de net ses, CW'de mors bip-bipleri. Bu rehber 4 ana modülasyon türü + neden farklı bantlarda farklı modlar kullanılır.

## Modülasyon nedir?

Sıradan ses sinyali (audio) düşük frekans, uzun mesafe gitmez. Modülasyon = audio'yu **yüksek frekanslı taşıyıcı dalga** (carrier, RF) üstüne bindirme süreci.

Üç temel parametre değiştirilebilir:

1.  **Genlik** (amplitude) → AM
2.  **Frekans** (frequency) → FM
3.  **Faz** (phase) → PM (radyoda nadir, dijital modlarda)

## AM (Amplitude Modulation)

İlk radyo modülasyonu, 1900 başında geliştirildi. Sinyalin **genliği** ses dalgasıyla değişir.

### Sinyalin yapısı

-   1 carrier + 2 sideband (üst + alt)
-   Bandgenişliği: ses sinyalinin **2 katı** — 6 kHz ses → 12 kHz RF

### Ekonomi

-   Carrier'ın gücü %66'sı sadece **bilgi taşımayan** sürekli ton
-   100W AM → bilgi sadece 33W eşdeğeri

### Kullanım

-   Ticari radyo (AM broadcasting) — 540-1700 kHz
-   Havacılık VHF (118-137 MHz) — uçak/kontrol kulesi (FM yerine AM çünkü "capture effect" yok, iki gönderici karışmasında ikisi de duyulur)
-   Amatör HF — bazı "vintage" operatörler (60m bandında özel)
-   Citizens Band (CB)

### Neden amatörde az?

-   Geniş band (verim düşük)
-   Modern alternatifler (SSB) %75 daha verimli
-   Yine de kültürel sebepten "AM Phone" toplulukları var

## FM (Frequency Modulation)

Edwin Armstrong 1933 — 30 yıl AM'in monopolisinden sonra büyük gelişme. **Carrier frekansı** değişiyor, genlik sabit.

### Sinyalin yapısı

-   Sabit zarf (constant envelope) — genlik değişmiyor
-   Frekans excursion ±2.5 kHz (narrow) veya ±5 kHz (wide)
-   Bandgenişliği: ~12.5 kHz (narrow) veya 25 kHz (wide)

### Avantajlar

-   **Parazit reddi** — genlik gürültüsünü yutar (electrical noise FM'de minimal)
-   **Capture effect** — iki sinyal aynı frekansta ise güçlü olan kazanır, zayıf duyulmaz (AM'de ikisi karışır)
-   **Class C amplifier** kullanılabilir — %70+ verim

### Kullanım

-   **VHF/UHF röleler** — Türkiye 2m röle 145.6125 (-0.6) standartı FM
-   Ticari TV ses (eski analog), FM broadcasting (88-108 MHz)
-   Amatör 2m + 70cm — el telsizi, mobile

### Türkiye'de

145.500 MHz çağrı frekansı, röleler hep FM. Yeni başlayan amatörlerin %80'i FM ile başlar.

## SSB (Single Sideband)

AM'in problemini çözen modülasyon — gereksiz carrier ve duplicate sideband'i kaldır.

### Sinyalin yapısı

AM'de carrier + iki sideband var. SSB'de **sadece bir sideband**:

-   **USB** (Upper Sideband) — üst yan
-   **LSB** (Lower Sideband) — alt yan

Bandgenişliği: AM'in **yarısı** (~3 kHz audio için 3 kHz RF)

### Türkçe gelenek (HF amatör)

-   **10 MHz altı**: LSB — 80m, 40m
-   **10 MHz üstü**: USB — 20m, 15m, 10m

Yanlış SSB seçince ses anlaşılmaz hale gelir ("Donald Duck" effect).

### Avantajlar

-   **Verim** — 100W SSB ≈ 400W AM bilgi açısından
-   **Bandgenişliği** — 3 kHz, AM'in yarısı, daha çok kullanıcı sığar
-   **DX için ideal** — uzun mesafede zayıf sinyal koşullarda anlaşılır

### Dezavantajlar

-   **Karmaşık ekipman** — AM'den daha pahalı
-   Ses **doğal değil** — nazaldır, "ham radio" karakterli

### Kullanım

-   **HF amatör** — DX, uzun mesafe, contest
-   Maritime HF (denizcilik)
-   Askeri HF
-   Eski telefon trunk lines

### Pratik

14.230 MHz USB üstüne git, hafta sonu Avrupa SSB QSO'larını dinle. Sıkça kullanılan freq:

-   14.245-14.300 MHz USB — DX dinleme
-   7.080-7.200 MHz LSB — Avrupa/TR
-   3.760-3.800 MHz LSB — gece TR

## CW (Continuous Wave / Morse Code)

İlk radyo modülasyonu — 1900'lerin başı. Aslında modulasyon değil, sadece **on/off keying** (taşıyıcı yokken sıfır, varken sürekli).

### Sinyalin yapısı

-   Sadece carrier (no audio)
-   Mors kodu: kısa = nokta, uzun = tire
-   Bandgenişliği: ~150 Hz (en dar mod)

### Avantajlar

-   **En uzun menzil** — daralık → en yüksek SNR/güç oranı
-   **QRP altın çağı** — 5W CW ile dünyaya kontak
-   **Anteni az veriyor** — kötü antenle bile çalışır
-   **EmComm sürücüsü** — koşullar kötü olduğunda son seçenek

### Dezavantajlar

-   **Mors öğrenmek zor** — 6-12 ay pratik
-   Hız sınırlı — 25-30 wpm üst seviye operatör
-   Modern dijital modlar (FT8) CW'in çoğu avantajını taşıyor

### Kullanım

-   HF DX, contest
-   POTA/SOTA — düşük güç, hızlı QSO
-   EmComm yedek

### Türkiye'de CW

2003'te lisans şartı kaldırıldı, ama hâlâ aktif CW topluluğu. CW Türkiye Kulübü (TC4FK) yıllık etkinlikler.

[Mors kodu öğrenme tutorial →](/tutorials/mors-kodu-ogrenme)

## AFSK (Audio Frequency Shift Keying)

Dijital mod altyapısı — ses tonlarıyla dijital veri.

### Yapı

-   Audio karşılığında ton1 = "0", ton2 = "1"
-   Telsiz SSB modunda, audio bağlantı bilgisayardan
-   WSJT-X, fldigi yazılımları decode

### Modlar

-   **FT8** (Joe Taylor) — 50 Hz BW, 15s slot, weak signal
-   **PSK31** — 31 baud, klavye chat
-   **RTTY** (1920'lerin teleprinter teknolojisi) — 45 baud, 170 Hz shift
-   **WSPR** — beacon (yukarıda)
-   **JS8Call** — chat tabanlı, FT8 alternatifi

[FT8 tutorial →](/tutorials/ft8-dijital-mod)

## Mod karşılaştırma tablosu

| Mod | BW | Avantaj | Dezavantaj | Kullanım |
| --- | --- | --- | --- | --- |
| **AM** | 6-9 kHz | Basit, "capture-free" | Verimsiz, geniş | Havacılık, vintage |
| **FM** | 12.5-25 kHz | Parazit reddi, sabit zarf | Geniş bant | VHF/UHF röle |
| **USB/LSB** | 2.4-3 kHz | Verim, dar | Karmaşık ekipman | HF amatör |
| **CW** | 150 Hz | En dar, en uzun menzil | Mors öğrenmek zor | DX, QRP, EmComm |
| **AFSK (FT8)** | 50 Hz | Otomatik, weak signal | Sadece kısa mesaj | DX, kontest |
| **DMR** | 12.5 kHz | Dijital ses, internet köprü | Lisans + ekipman | VHF/UHF |

## Hangi mod hangi senaryoda?

### "VHF röle ile kontağa başlamak istiyorum"

**FM** — el telsizi + röle = en kolay başlangıç. 145.500 simplex çağrısı veya yerel röle.

### "HF DX yapmak istiyorum, kişisel ses"

**SSB (USB/LSB)** — 14.245 USB or 7.150 LSB üstünde DX.

### "QRP, düşük güçle uzun mesafe"

**CW** veya **FT8** — düşük SNR'da çalışır, 5W ile dünya.

### "Yarışma yapmak"

**SSB + CW + RTTY** — ana contest modları. SSB phone kategorisi en kalabalık.

### "Acil iletişim"

**FM** (yakın röle) + **HF SSB** (bölgesel NVIS) + **CW backup** (kötü koşul).

### "Dijital chat"

**JS8Call** — FT8 altyapısı + klavye chat.

## Yasal sınırlamalar

Türkiye yönetmeliği:

-   **Tüm modlar lisanslı amatör operatöre serbest** (mevcut bantlarda)
-   **Encryption (şifreli)** — yasak (acil durum hariç)
-   **Yayın izni alınmış kanallar (broadcasting)** — sadece broadcaster, amatör değil

## Sık sorulan sorular

### Telsizimde "FM" + "FM-N" var, fark nedir?

FM-N = Narrow FM, ±2.5 kHz deviation, 12.5 kHz BW. Modern röleler için standart. FM (wide) = ±5 kHz, 25 kHz BW, eski analog TV ses gibi geniş.

### Aynı frekansta hem SSB hem FM dinleyebilir miyim?

Hayır, **modu seçmek zorundasın**. SSB modunda FM sinyali "buzz" gibi gelir, FM modunda SSB sinyali Donald Duck.

### USB ve LSB nereden gelir?

Carrier'ın **üstündeki** sideband = USB, **altındaki** = LSB. SSB ekipmanı carrier'i bastırır + bir sideband'i seçer.

### CW'de mors hız?

-   Yeni başlayan: 5-12 wpm
-   Orta: 15-20 wpm
-   Pro: 25-40 wpm
-   Contest super: 40+ wpm

### Hangi bant hangi mod?

-   2m/70cm: FM (röle), SSB (DX)
-   80m/40m: SSB (LSB) + CW
-   20m: SSB (USB) + CW + FT8
-   6m: All modes (AM, FM, SSB, CW, FT8)

* * *

## İlgili kaynaklar

-   [FT8 dijital mod](/tutorials/ft8-dijital-mod) — AFSK temel
-   [Mors kodu öğrenme](/tutorials/mors-kodu-ogrenme) — CW
-   [Q kodları + işletme adabı](/tutorials/q-kodlari-isletme-adabi)
-   [HF propagasyon temelleri](/tutorials/hf-propagasyon-temelleri)
-   [İlk telsiz satın alma](/tutorials/ilk-telsiz-satin-alma-rehberi)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — modülasyon makaleleri
