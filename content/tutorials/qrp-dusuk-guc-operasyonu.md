---
title: QRP (Düşük Güç) Operasyonu — 5 Watt ile Dünyaya Meydan Okuma
description: >-
  QRP (≤5W) amatör radyo felsefesi. Neden düşük güç tercih edilir, anten
  verimliliği zorunluluğu, batarya bağımsızlığı, POTA/SOTA QRP, CW ve FT8 ile
  dünya kontağı.
keywords:
  - QRP
  - düşük güç
  - CW
  - FT8
  - POTA
  - SOTA
  - portable
article_section: QRP
published_at: '2026-04-26'
updated_at: '2026-04-26'
faq:
  - q: QRP gerçekten DX yapabilir mi?
    a: >-
      Kesinlikle evet — FT8 modunda 5W ile dünya çapında kontak günlük olarak
      yapılır. CW'de ayda birkaç DX gerçekçi. SSB'de nadir ama mümkün.
  - q: En ucuz QRP setup?
    a: >-
      - (tr)uSDX kit ($80) + EFHW ($20 DIY) + LiFePO4 batarya ($30) = $130 ile
      HF tüm dünya
  - q: QRP vs QRO — hangisi "daha iyi"?
    a: >-
      İkisi farklı disiplin. Çoğu operatör ikisini de yapar — gündüz QRP POTA,
      akşam QRO contest.
  - q: '100W telsizim var, QRP yapabilir miyim?'
    a: 'Evet — güç knob''unu 5W''a indir, hepsi bu.'
  - q: QRP'ta en büyük sorun?
    a: >-
      Pile-up'ta duyulmamak. DX istasyona 100W operatörler çağırıyorken 5W
      kaybolur. Çözüm: pile-up seyreldiğinde çağır, veya split operasyonda
      farklı offset kullan. ---
---
100 Watt'ı kaba kuvvet olarak düşünün — propagasyon kötüyken bile sinyali zorla itiyorsunuz. **QRP (≤5 Watt)** tam tersi: güneş döngüsünü, iyonosferi, anten verimliliğini bir satranç oyuncusu gibi okumayı gerektirir. 5 Watt'la Avustralya'ya kontak yapmak, 100 Watt'la yapmaktan **kat kat tatmin edici** — çünkü her milliwatt değerli.

## QRP tanımı

Uluslararası standart:

-   **SSB (sesli)**: ≤10 Watt çıkış
-   **CW + dijital**: ≤5 Watt çıkış

Pratikte çoğu QRP operatör **5 Watt veya altını** hedefler. Extreme QRP ("milliwatting"): 100 mW, hatta 10 mW ile kontak — özel bir disiplin.

## Neden düşük güç?

### 1\. Operatörlük becerisi zorunluluğu

Yüksek güç teknik hataları bastırır — kötü anten, yanlış empedans, gürültülü ortam hâlâ çalışır. QRP'ta **her şey optimize olmalı**: anten rezonant, koaks kayıpsız, bant/saat doğru seçilmiş. Bu zorunluluk sizi daha iyi amatör yapar.

### 2\. Propagasyon ustalığı

100 Watt'ta "açık bant" kavramı çok geniş. 5 Watt'ta **tam doğru anda tam doğru bantta** olmanız gerekir. Güneş döngüsü, gri çizgi (gray line), MUF tahminleri QRP operatörü için günlük disiplin.

### 3\. Anten verimliliği = her şey

5 Watt basarken antendeki 1 dB kayıp çok önemli. Bu sizi **en verimli anteni kurmaya**, konnektörlerdeki kayıpları sıfırlamaya, balun/choke kalitesini artırmaya zorlar. QRP yapan amatörün anten bilgisi genelde çok yüksek.

### 4\. Taşınabilirlik

100 Watt telsiz → büyük güç kaynağı + ağır batarya. QRP telsiz → avuç içi kadar, küçük LiFePO4 bataryayla saatlerce. **POTA / SOTA aktivasyonunda** sırt çantasındaki her gram önemli.

### 5\. Enerji bağımsızlığı

Küçük güneş paneli (10-30W) ile QRP telsizi süresiz çalıştırabilirsiniz. Grid-off operasyon, afet senaryosu, kamp — hepsi QRP dostu.

### 6\. RFI / komşu sorunu minimum

5 Watt'la komşunun TV'si, Wi-Fi'sı, işitme cihazı etkilenmez. [Apartmanda amatör telsizcilik](/tutorials/apartmanda-amator-telsizcilik) için QRP doğal seçim.

### 7\. Başarı duygusu

100 Watt'la Japonya'ya kontak → "güzel". 5 Watt'la Japonya'ya kontak → "**mucize, anlat bunu!**". QRP topluluğunda DX her zaman kutlanır, çünkü zorluk yüksek.

## QRP'ta hangi mod?

### CW (Mors kodu) — altın standart

-   En dar bantgenişliği (150 Hz)
-   En yüksek SNR/watt oranı
-   5W CW ≈ 25W SSB (sinyal gücü karşılaştırması)
-   [Mors kodu öğrenme →](/tutorials/mors-kodu-ogrenme)

### FT8 / FT4 — modern mucize

-   \-25 dB SNR decode → 5W ile Avustralya **sıradan**
-   Otomatik exchange, hızlı kontak
-   WSJT-X yazılımı
-   [FT8 tutorial →](/tutorials/ft8-dijital-mod), [FT4 →](/tutorials/ft4-hizli-dijital-mod)

### SSB — zor ama mümkün

-   5W SSB → 1000-3000 km tipik (propagasyon uygunsa)
-   10W SSB → kıtalar arası mümkün
-   DX kontağı zor, sabır gerek

### JS8Call — chat alternatifi

-   Weak-signal + klavye chat
-   \-22 dB decode
-   [JS8Call tutorial →](/tutorials/js8call-radyo-chat-modu)

## QRP ekipman

### Dedike QRP transceiver'lar

| Cihaz | Bant | Güç | Ağırlık | Fiyat |
| --- | --- | --- | --- | --- |
| **Yaesu FT-818ND** | HF+6m+2m+70cm | 6W | 1.2 kg | ~$700 |
| **Xiegu G90** | HF | 20W (5W QRP mod) | 1.6 kg | ~$500 |
| **Icom IC-705** | HF+VHF+UHF | 5W/10W | 1.1 kg | ~$1300 |
| **Elecraft KX2** | HF | 12W | 0.4 kg | ~$1100 |
| **QCX+ kit** | HF CW only | 5W | 0.3 kg | ~$60 |
| **(tr)uSDX** | HF all-mode | 5W | 0.2 kg | ~$80 |

**QCX+ ve (tr)uSDX** = ultra budget, CW veya all-mode, kit yapım zevki + QRP. ~$60-80 arası tam fonksiyonel HF transceiver.

### Normal telsizi QRP modunda kullanma

-   Icom IC-7300 → güç knob'unu **5W'a** çevir → QRP hazır
-   Herhangi bir 100W telsiz düşük güç moduna sahip

### Anten (QRP'ta kritik)

-   **EFHW** — en verimli portable, kayıp az → [EFHW tutorial →](/tutorials/efhw-anten-detay-pota)
-   **Dipole** — rezonant, düşük kayıp
-   **Magnetic loop** — apartman QRP'ın kurtarıcısı → [Mag loop tutorial →](/tutorials/magnetic-loop-anten-yapimi)
-   **Vertical** — DX QRP için düşük açılı yayma

### Batarya

-   **LiFePO4 3Ah** (~300 gr) → 3 saat CW operasyon
-   **LiFePO4 10Ah** (~800 gr) → 10+ saat (tam gün POTA)
-   **Güneş paneli 20W** → süresiz operasyon (gündüz)

## QRP DX rekorları

-   **5W FT8 → Avustralya** (Türkiye'den 15.000 km) — yaygın, haftada onlarca
-   **1W CW → Brezilya** (10.000 km) — propagasyon peak'te
-   **100 mW WSPR → Yeni Zelanda** (17.000 km) — beacon modu
-   **10 mW → Avrupa** (2.000 km) — extreme QRP challenge

Cycle 25 zirvesi (2026) QRP için **altın çağ** — yüksek SFI düşük güçü telafi ediyor.

## QRP contest

### QRP kategorileri (büyük contestlerde)

-   **CQ WW DX** QRP division (≤5W)
-   **ARRL DX** QRP
-   **IARU HF** QRP
-   Ayrı puanlama, ayrı ödül

### QRP-specific contest

-   **QRP ARCI Sprint** — sadece QRP operatörler
-   **QRP Foxhunt** — gizli "tilki" arama yarışı
-   **SOTA aktivasyon** — çoğu zaten QRP (batarya taşıma)

## QRP toplulukları

### Uluslararası

-   **QRP-ARCI** (Amateur Radio Club International) — en büyük QRP derneği
-   **G-QRP Club** (UK) — 1974'ten beri, "SPRAT" dergisi
-   **4-States QRP Group** — kit tasarım + DIY

### Türkiye

-   Dedike QRP kulübü yok ama TRAC bünyesinde QRP ilgisi var
-   POTA aktivatörleri doğal QRP operatör

## QRP felsefesi: "Less is more"

QRP sadece düşük güç değil, **bir düşünce biçimi**:

-   Daha az ekipman, daha çok bilgi
-   Daha az güç, daha çok anten çalışması
-   Daha az kontak belki, ama her biri anlamlı
-   Doğa + radyo entegrasyonu (POTA/SOTA ruhu)
-   Acil iletişim hazırlığı (batarya bağımsızlığı)

Contest'te 100 QSO/saat yapan operatör vs 5W ile 3 saatte 1 DX kontak yapan QRP operatör — **ikisi de aynı derecede "amatör telsizci"**, sadece farklı yaklaşım.

## Pratik: QRP ile ilk DX

### En kolay yol: 5W FT8

1.  Telsiz güç 5W
2.  WSJT-X + USB cable
3.  20m bandı (14.074 MHz) gündüz
4.  CQ FT8 → 5-10 dakikada Avrupa kontak
5.  İyi propagasyonda Japonya, ABD, Güney Amerika

### Zor ama tatmin edici: 5W CW

1.  En az 12 WPM mors hızı ([Koch öğrenme](/tutorials/mors-kodu-ogrenme))
2.  14.060 MHz CW çağrı
3.  "CQ QRP DE TB3KKD QRP K"
4.  Karşı taraf duyduğunda "**UR 5W? FB!**" diye sevinir

### Expert: 5W SSB

1.  14.245 MHz USB
2.  Güçlü operatörler arasında **zayıf sinyal olarak** var olmak
3.  "QRP 5 watts, please listen carefully"
4.  Sabır — 10 dakika CQ atıp cevap gelmeyebilir
5.  Geldiğinde tatmin **büyük**

## Sık sorulan sorular

### QRP gerçekten DX yapabilir mi?

**Kesinlikle evet** — FT8 modunda 5W ile dünya çapında kontak **günlük** olarak yapılır. CW'de ayda birkaç DX gerçekçi. SSB'de nadir ama mümkün.

### En ucuz QRP setup?

-   **(tr)uSDX kit** ($80) + EFHW ($20 DIY) + LiFePO4 batarya ($30) = **$130** ile HF tüm dünya

### QRP vs QRO — hangisi "daha iyi"?

İkisi farklı disiplin. Çoğu operatör **ikisini de** yapar — gündüz QRP POTA, akşam QRO contest.

### 100W telsizim var, QRP yapabilir miyim?

Evet — güç knob'unu 5W'a indir, hepsi bu.

### QRP'ta en büyük sorun?

**Pile-up'ta duyulmamak**. DX istasyona 100W operatörler çağırıyorken 5W kaybolur. Çözüm: pile-up seyreldiğinde çağır, veya split operasyonda farklı offset kullan.

* * *

## İlgili kaynaklar

-   [POTA / SOTA aktivasyon rehberi](/tutorials/pota-sota-aktivasyon-rehberi) — QRP outdoor
-   [EFHW anten detay](/tutorials/efhw-anten-detay-pota) — QRP'ın anteni
-   [Magnetic loop yapımı](/tutorials/magnetic-loop-anten-yapimi) — apartman QRP
-   [FT8 dijital mod](/tutorials/ft8-dijital-mod) — 5W ile dünya
-   [CW mors kodu öğrenme](/tutorials/mors-kodu-ogrenme)
-   [Apartmanda amatör telsizcilik](/tutorials/apartmanda-amator-telsizcilik) — QRP dostu
-   [İlk telsiz satın alma](/tutorials/ilk-telsiz-satin-alma-rehberi) — QRP cihaz önerileri
-   QRP-ARCI: [qrparci.org](https://www.qrparci.org/)
-   G-QRP Club: [gqrp.com](http://www.gqrp.com/)
-   **Genişletilmiş kaynak:** [telsizcilik.com](https://telsizcilik.com/) — QRP makaleleri
