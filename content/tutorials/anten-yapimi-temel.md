---
title: 'Temel Anten Yapımı: J-Pole ve Slim Jim (2m / 144 MHz)'
description: >-
  VHF amatör için pratik J-Pole ve Slim Jim anten projeleri — bakır boru ve TV
  ribbon kablo ile, dakik formüller, SWR ölçümü ve test, ucuz fakat fabrika
  antenlerinden iyi sonuç.
keywords:
  - anten
  - diy
  - vhf
  - uhf
  - j-pole
  - slim-jim
  - swr
article_section: anten
published_at: '2026-04-25'
updated_at: '2026-04-25'
faq:
  - q: '70 cm (UHF, 432 MHz) için aynı tasarım çalışır mı?'
    a: >-
      Evet, formülleri 432 MHz ile yeniden hesapla: J-Pole ~33 cm radyatör +
      16.5 cm stub. Boru çapı küçülmeli (15 mm).
  - q: Antenin verimi % kaç?
    a: >-
      İyi yapılmış J-Pole/Slim Jim ~90% verim. Yer kayıpları ve koaks
      attenüasyonu hariç.
  - q: Koaks uzunluğu fark eder mi?
    a: >-
      Evet — uzun koaks attenüasyon (RG-58 100m'de 4 dB @ 145 MHz). 5-15 m
      ideal. RG-213 daha az kayıplı (1.6 dB/100m), pahalı.
  - q: Çift bantlı (2m + 70cm) yapabilir miyim?
    a: >-
      J-Pole 2m'de tasarlanmış ama 70cm'in 3. harmoniğinde de çalışır (kabul
      edilebilir SWR). Optimal değil; ayrı çift bant tasarımı (Diamond X-50 vb.
      ticari).
---
## Neden DIY anten?

Amatör el telsizinin gücü 5W ile sınırlı, mobilde 25-50W. Menzilinizi katlayan tek faktör **antenin kalitesi ve yüksekliği**dir. 1 dB anten kazancı eklemek vericinizi 1.26× güçlendirmekle aynıdır; **6 dB anten kazancı = 4× güç**. Anten masrafsız 6-9 dB iyileştirme verebilir.

Stock kauçuk antenler taşınabilirlik için dizayn edildi, kompromise. Sabit veya yarı-sabit kullanım için kendi yapımınız fabrika antenlerinin çoğundan üstün gelir; maliyet 50-200 TL.

Bu rehberde **2 metre amatör bandı (144-148 MHz)** için iki klasik tasarım:

1.  **J-Pole** — bakır borudan, sabit istasyon için, 2 dBi kazanç
2.  **Slim Jim** — TV ribbon kablodan, taşınabilir, 2-3 dBi kazanç

İkisi de half-wave dipole + matching transformer prensibine dayanır.

> 🛠️ **Hesaplayıcı:** Frekans + anten tipi + velocity factor girip boyları otomatik almak için → **[Anten Boy Hesaplayıcı](/araclar/anten-hesaplayici/)** (J-Pole, Slim Jim, dipole, vertical, EFHW dahil; SVG diyagramlı).

## Anten formülleri

### Tam dalga boyu

```
λ (m) = 300 / freq (MHz)
```

145 MHz için: λ = 300 / 145 = **2.069 m**

### J-Pole boyutları (klasik formül)

| Bölüm | Formül | 145 MHz için |
| --- | --- | --- |
| Radyatör (yarım dalga, üst kol) | `142.5 / freq` | **0.983 m ≈ 98 cm** |
| Matching stub (çeyrek dalga, alt kol) | radyatör / 2 | **49 cm** |
| Stub'lar arası boşluk | ~38 mm (1.5") | 38 mm |
| Besleme noktası (stub'ın dibinden) | 2-7 cm arasında deneyimle ayarlanır | başla: 4 cm |

> **Hız faktörü (VF):** Bakır boru için VF ≈ 0.95-0.98. Yalıtkan kaplamalı tel için VF düşer (~0.85). Hesaplamada metalik aether boru kullanıyorsanız direkt formül; yalıtkanlı telde boy %5 kısalır. Tabloda VF = 1 varsayıldı; çıplak bakır boru için ~%2 kısaltma uygulanabilir.

### Slim Jim boyutları (M0UKD formülü)

Slim Jim, J-Pole'un katlamasıdır — toplam uzunluk yaklaşık aynı, ama ek bir end-fed half-wave gain'i sağlar.

| Bölüm | Formül | 145 MHz için |
| --- | --- | --- |
| Toplam uzunluk | `293 / freq * 0.97` (VF dahil) | **1.96 m ≈ 196 cm** ribbon |
| Radyatör (üst yarım) | toplam / 2 | 98 cm |
| Matching stub (alt) | toplam / 4 | 49 cm |
| Üst gap (kesim noktası) | 8-10 mm | 9 mm |
| Besleme noktası (alttan) | 4-6 cm | 5 cm (deney ile ince ayar) |

## J-Pole Anten (sabit istasyon)

### Malzeme listesi

| Parça | Adet | Yaklaşık fiyat |
| --- | --- | --- |
| 22 mm çapında bakır su borusu | ~2 m | ~150 TL |
| 22 mm bakır T-piece | 1 | 30 TL |
| 22 mm bakır 90° dirsek | 2 | 30 TL |
| 22 mm end-cap | 2 | 25 TL |
| 50Ω koaksiyel kablo (RG-58 / RG-213) | 5-15 m (anten + indirme) | 25-60 TL/m |
| BNC veya PL-259 (UHF) konektör | 1 | 50 TL |
| Lehim, lehim pastası, propan brülörü | — | mevcut araç gereci |
| Anten direği, kelepçe, plastik şapka | — | yedek malzemeden |

**Toplam:** ~400-700 TL (lehim ekipmanı hariç).

### Çizim (yapısal)

```
                    ┌─── 98 cm ─────┐
                    │  (radyatör)    │
        end-cap ────┘                │
                                     │
       38 mm ←──────boşluk──────→    │
                                     │
        end-cap ────┐                │
                    │ 49 cm          │
                    │ (matching)     │
                    │                │
   Besleme ───────► ●                │
   noktası          │ ~4 cm aşağıda  │
   (4 cm ↑)         │                │
                    └────T-piece─────┘
                          │
                          ▼
                       altlık
                    + koaks indirme
```

### Yapım adımları

1.  **Kesim:** Bakır boruyu 98 cm + 49 cm + birkaç ekleme parçası olarak boyla.
2.  **T-piece lehimi:** Alt uçta T-piece'i iki dik kola lehimle (propan brülörü, kurşunsuz lehim, lehim pastası).
3.  **End-cap:** Üst uçlara end-cap'leri lehimle. Su geçirmez + ısı dağılımı azalır.
4.  **Altlık:** T-piece'in alt çıkışına 90° dirsek + 30-50 cm dikey boru + altlık.
5.  **Besleme lehimi:**
    -   Koaksın **merkez iletkenini** (sıcak) → **uzun radyatöre** (98 cm), stub dibinden ~4 cm yukarıya
    -   Koaksın **dış zırhını** (toprak) → **matching stub'a**, aynı yükseklikte
    -   İki nokta arası tam yatay olmalı
6.  **Çevre güvenliği:** Tüm lehim noktalarını silikon/heat-shrink ile kapla. Yağmur/ kar girmesini engelle.
7.  **Direğe monte:** PVC/plastik kelepçeler kullan (metal kelepçe → kapasitans → SWR bozulur).

### SWR ayar

J-Pole'un SWR'si **besleme noktası yüksekliğine** çok hassas. NanoVNA, MFJ-849 veya Nissei RS-22 ile:

1.  SWR ölçeri 144-148 MHz aralığında geniş tara.
2.  Hedef: **SWR < 1.5:1** (1.0 mükemmel, < 1.3 çok iyi).
3.  Min SWR frekansı 146 MHz'in altındaysa: besleme noktasını **aşağıya** kaydır (1-2 cm).
4.  Üstündeyse: **yukarıya** kaydır.
5.  SWR > 2 ve hiç hareket etmiyorsa: lehim kötü, koaks dönüş hattı zayıf, antenin yer kapasitansı yüksek.

## Slim Jim Anten (taşınabilir)

### Malzeme

| Parça | Açıklama | Fiyat |
| --- | --- | --- |
| 300Ω TV ribbon kablo | Eski televizyon ikiz hat (ladder line); 2 metre | 30-50 TL |
| 50Ω koaks (RG-58, ~3 m) | Anten → telsiz | 60 TL |
| BNC konektör | 1 | 40 TL |
| Su izolasyon bandı | — | mevcut |
| Asma çubuğu (bambu / fiberglass) | İsteğe bağlı | 30-100 TL |

**Toplam:** ~150-280 TL.

### Çizim

```
   ┌───── açık uç (üst, 8-10 mm gap) ───┐
   │                                       │
   │ ◄── tek-kesim noktası (yarısından,    │
   │     bir telin kesimi, diğer bütün)    │
   │                                       │
   │  98 cm                                │
   │                                       │
   ├──────────── matching ─────────────────┤
   │                                       │
   │  49 cm                                │
   │                                       │
   ●─◄── besleme: ~5 cm yukarıda           │
   │                                       │
   └──── kapalı uç (alt, kısa devre) ──────┘
```

### Yapım adımları

1.  **Hazırlık:** 300Ω ribbon kablonun ~196 cm'lik düz parçasını çıkar. İki tel paralel.
2.  **Üst uç:** 8-10 mm açık gap bırak (iki tel arası kesim).
3.  **Tek-kesim noktası:** Üstten 98 cm aşağıda, **sadece bir tarafın telini kes** (diğer taraf bütün kalır). Bu radyatörün başlangıcıdır.
4.  **Alt uç:** İki teli birbirine lehimleyerek **kısa devre** yap.
5.  **Besleme:** Alttan ~5 cm yukarıda iki teli koaksa lehimle:
    -   Merkez iletken → bir tel
    -   Dış zırh → diğer tel
6.  **İzolasyon:** Su geçirmez bant ile lehim noktalarını sar.
7.  **Asma:** Bambu çubuk, plastik askı veya kapı kemeri ipiyle düşey gerin (yatay polarizasyon ister, dikey amatör için döndür).

### SWR ayarı (Slim Jim)

J-Pole gibi, besleme yüksekliğine hassas:

-   Düşük SWR frekansı bantın altında ise besleme noktasını **yukarı** kaydır.
-   Üstündeyse **aşağı**.
-   Toplam uzunluk yanlış kesilmişse besleme noktası ayarı yetmez — tekrar üret.

## Test ve doğrulama

### SWR ölçümü zorunlu

Hiçbir ev yapımı anten **mutlaka** SWR ölçeri ile doğrulanmalı. UV-K5 gibi ucuz telsizlerde dahili ölçüm yoktur; PA hasarına karşı harici ölçer şart.

| SWR | Yorum |
| --- | --- |
| ≤ 1.3 | Mükemmel |
| 1.3-1.5 | Çok iyi |
| 1.5-2.0 | Kabul edilebilir |
| 2.0-3.0 | TX gücünüzün önemli kısmı geri yansır; kısa süreli OK |
| \> 3.0 | **TX kapatın** — verici PA'sı yanma riski |

### NanoVNA önerisi

NanoVNA-H ~1500-2500 TL, anten + filtre + impedans ölçer + spektrum analizci işlevi görür. Tek alacaksanız bu çok değerli yatırım.

## Yükseklik etkisi

Antenin yüksekliği menzili **doğrusal olmaktan fazla** etkiler — tropoposferik propagasyon yüksekliğin karesiyle orantılı. 6m yüksekliğindeki bir J-Pole, yer seviyesindeki aynı antene göre **2-3× menzil verir**. Çatıya çıkarmak değer.

## Güvenlik notları

-   **Yıldırım:** Çatı antenleri yıldırım için risk. Topraklama hattı (≥10 mm² tel, doğrudan toprak elektroduna) + arrestor (gas discharge tube). Fırtınada koaks bağlantısını kesin.
-   **RF maruziyet:** TX sırasında antene 50 cm'den yakın durmayın. 5W VHF'te 1m mesafe güvenli; 50W'de 3m.
-   **Kurulum:** Çatı veya direkten yüksek noktada **iki kişi** çalışın. Emniyet kemeri + topuklu tabanlı ayakkabı.
-   **Elektrik hatları:** Anten direği elektrik hattına yıkıldığında düşeceği uzaklıktan en az 2× uzak olmalı.

## Daha gelişmiş tasarımlar

J-Pole + Slim Jim öğrenirken dipol fenomenini içselleştirir. Sonraki adımlar:

-   **Yagi anten** (yönlü, 6-15 dBi kazanç) — DX kontestler için
-   **Quagi (Quad Yagi)** — yagi'den biraz daha geniş bant, mobilde yararlı
-   **Moxon** — kompakt 2-element yönlü, çatıya sığar
-   **Eggbeater** (uydu) — sirküler polarize, AMSAT için

## Sık sorulan sorular

| Soru | Cevap |
| --- | --- |
| 70 cm (UHF, 432 MHz) için aynı tasarım çalışır mı? | Evet, formülleri 432 MHz ile yeniden hesapla: J-Pole ~33 cm radyatör + 16.5 cm stub. Boru çapı küçülmeli (15 mm). |
| Antenin verimi % kaç? | İyi yapılmış J-Pole/Slim Jim ~90% verim. Yer kayıpları ve koaks attenüasyonu hariç. |
| Koaks uzunluğu fark eder mi? | Evet — uzun koaks attenüasyon (RG-58 100m'de 4 dB @ 145 MHz). 5-15 m ideal. RG-213 daha az kayıplı (1.6 dB/100m), pahalı. |
| Çift bantlı (2m + 70cm) yapabilir miyim? | J-Pole 2m'de tasarlanmış ama 70cm'in 3. harmoniğinde de çalışır (kabul edilebilir SWR). Optimal değil; ayrı çift bant tasarımı (Diamond X-50 vb. ticari). |

## Sıradaki

-   [UV-K5 programlama](/tutorials/uv-k5-programlama) — yeni anteni kullanacağınız telsiz
-   [Röle nedir?](/tutorials/role-nedir) — yüksek antenle röle menzili 2-3× artar
-   [CTCSS / DCS](/tutorials/ctcss-dcs-nedir) — antenin yanında doğru ton ile röle açma

73 ve iyi inşalar! Antenin SWR ölçümü iyiyse, foton (resim/fotoğraf) paylaşmayı unutma — topluluk DIY işlerini sever.
