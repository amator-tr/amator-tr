---
title: "İletişim & Katkı"
description: "amator.tr ile iletişime geçin — hata bildirimi, içerik katkısı, yeni cihaz desteği için GitHub Issues veya e-posta. Lisans, atıflar ve yazar bilgisi."
updated_at: 2026-05-09
---

## Yazar

**Kaan Dikeç** — Bilgisayar Mühendisi

Amatör telsiz çağrı işaretim: **TB2KKD**

amator.tr'yi açık kaynak hobi projesi olarak geliştiriyor ve sürdürüyorum. Topluluğun katkıları + geri bildirimleri büyük değer taşır.

## E-posta

```
amatortelsiz [et] yodobi [nokta] app
```

(Anti-spam için açıkça yazıyoruz; spambot dostudur. Düz hâli: `amatortelsiz` + `@` + `yodobi.app`)

## Hata bildirimi & özellik isteği

En hızlı kanal **GitHub Issues**:

→ **[github.com/amator-tr/amator-tr.github.io/issues](https://github.com/amator-tr/amator-tr.github.io/issues)**

Issue açarken şu bilgileri paylaşın:

-   Hatanın nasıl tetiklendiği (adım adım)
-   Beklediğiniz davranış vs gerçekleşen
-   Tarayıcı + işletim sistemi
-   (varsa) Ekran görüntüsü, hata konsolu çıktısı

## İçerik katkısı (Pull Request)

Tutorial'lar `content/tutorials/` klasöründe Markdown dosyalarıdır. Yeni bir kılavuz eklemek için:

1.  Repo'yu fork et
2.  `content/tutorials/yeni-konu.md` oluştur — frontmatter şablonunu mevcut tutorial'lardan kopyala
3.  Pull Request aç

Markdown frontmatter zorunlu alanlar:

```markdown
---
title: "Konunun Başlığı"
slug: konunun-slug-u
date: 2026-04-25
description: SEO için 150 karakter altı özet
tags: [tag1, tag2]
author: amator.tr
---
```

## Yeni cihaz desteği isteği

[Röle Export](/role-export/) sayfasına yeni telsiz/cihaz desteği eklenmesini istiyorsanız, **örnek bir CSV dosyası** göndermeniz gerek.

### Lütfen sadece CSV gönderin

❌ **`.rdt`** (TYT MD-380, Connect Systems CodePlug formatı) ❌ **`.dat`** (Anytone) ❌ **`.bin`** (Quansheng EEPROM dump) ❌ **`.img`** (CHIRP image dosyası) ❌ **`.ic7300_settings`**, **`.icf`**, **`.codeplug`**, üretici özel formatlar

✅ **Sadece `.csv`** — UTF-8, virgül veya noktalı virgül ayraçlı

CSV içinde minimum şu sütunlar olmalı:

| Sütun adı | Anlam |
| --- | --- |
| `Channel Name` veya `Name` | Kanal görünen adı (örn. "Çamlıca", "İstanbul-1") |
| `Frequency` veya `RX Frequency` | Alıcı frekansı (MHz, örn. 145.625) |
| `Duplex` veya `Offset Direction` | `+` / `-` / `simplex` |
| `Offset` veya `TX Offset` | Shift miktarı (örn. 0.6 MHz) |
| `Mode` | FM / NFM / AM |
| `Tone Mode` | OFF / Tone / TSQL / DTCS |
| `Tone` | CTCSS frekansı (örn. 100.0) |
| `Power` | Low / Mid / High |

Cihazınız bu şablonun dışında ekstra sütun gerektiriyorsa o sütunları **ek olarak** koyabilirsiniz — biz cihaz profilini eklerken bunları işleriz. Ama **temel CHIRP sütunları yoksa kabul edilmez**.

### Neden CSV-only?

-   **Reverse-engineering yükü:** Üretici özel binary formatları (RDT, BIN, vd.) dağınık + cihaza özgü. Her cihaz için ayrı parser yazmak imkansız.
-   **Topluluk standardı:** CHIRP CSV formatı ITU-Region-1'de fiilî standart; tüm büyük amatör programlama yazılımı destekler.
-   **Versiyon stabil:** Üretici binary formatlarını sessizce değiştirir; CSV stabil kalır.

CSV nasıl çıkarılır:

-   **CHIRP'te:** `File → Export → CSV` (en yaygın)
-   **Excel/LibreOffice'te:** Manuel hazırla, "Save as CSV" (UTF-8 encoding seç)
-   **Python ile:** Cihazın binary'sinden parse + pandas/csv modülü ile yazma

Hazır CSV'yi e-posta ile + cihazın **markası, modeli, firmware sürümü** bilgisiyle gönderin. ~1-2 hafta içinde [/role-export/](/role-export/) sayfasında profil görünür.

## Lisans

amator.tr **MIT Lisansı** altında açık kaynaktır:

```
MIT License

Copyright (c) 2026 Kaan Dikeç (TB2KKD)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Tutorial içeriği için:

-   Yazılı içerik **CC BY 4.0** (atıfla yeniden yayınlanabilir)
-   Kod örnekleri **MIT** ile aynı

## Atıflar

| Kaynak | Kullanım |
| --- | --- |
| **Röle veritabanı** | [amatortelsizcilik.com.tr](https://amatortelsizcilik.com.tr), [telsizcilik.com](https://telsizcilik.com), [ta-role.com](https://www.ta-role.com) — topluluk kaynakları, ticari kullanım yapmıyoruz |
| **Airband (havalimanı + frekans)** | [OurAirports.com](https://ourairports.com) — CC0 dataset |
| **Marine VHF Türkiye** | [TA1DX QSL.net sayfası](https://www.qsl.net/ta1dx/amator/bandmarine.htm) |
| **Harita** | [Leaflet](https://leafletjs.com) (BSD) + OpenStreetMap tiles + Carto basemap |
| **UV-K5 firmware bilgisi** | [armel/uv-k5-firmware-custom](https://github.com/armel/uv-k5-firmware-custom) (Apache 2.0) |
| **Lisans bilgisi** | [BTK](https://www.btk.gov.tr), [KEGM](https://www.kiyiemniyeti.gov.tr), [TRAC](https://trac.org.tr), [AKRAD](https://akrad.org.tr) |

Kullandığımız tüm kaynaklara teşekkür. Telif haklarının iyi yönetimi için herhangi bir öğe için "kaldırılma" talebi geldiğinde derhal kaldırırız — issue açın veya e-posta atın.

## Sosyal medya / Topluluk

Bu site herhangi bir kuruluşa bağlı değildir. Kişisel bir hobi projesidir.

Topluluk ortak alanları için **TRAC** (ulusal), **AKRAD**, **DARD**, **ANTRAK**, **TAMSAT** gibi kulüplerin sosyal medyalarını takip edebilirsiniz. Her bölgenin kendi haftalık net'i + etkinlik takvimi vardır.

73, **de TB2KKD**.
