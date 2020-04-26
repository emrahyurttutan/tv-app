<?php

class Db extends pdo
{//intelligent functions object

    // SINIFIN DEĞİŞKENLERİ
    private $sor;                // 	sorgu kaynağı
    private $liste;            // 	istenen tablonun liste hali
    public $sql;            // 	sql sorgu cümlesi
    public $say;                // 	toplam kayıt sayısı
    public $hata;            // 	sorgu hataları
    public $sayfa;            // 	istenen sayfa numarası
    public $topsayfa;    //	limete göre sayfa sayısı
    public $ip;                //	istemci ip adresi
    public $suan;            //	zaman Y-m-d G:i:s
    public $bugun;            //	zaman Y-m-d
    public $buyil;            //	zaman	Y

    // SINIFIN FONKSİYONLARI

    //statik fonksiyonlar
    static function sifrele($s)
    {//gönderilen değeri şifreleyerek geri döndürür
        return md5(md5(md5(trim($s))));
    }

    static function tarih2($t, $f = '%d %B %Y')
    {//tarihi istenen formatta üretip geri döndürür

        $cikti = iconv('latin5', 'utf-8', strftime($f, strtotime($t)));
        $aylarIng = array(
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        );
        $gunlerIng = array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
        $aylar = array(
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        );
        $gunler = array("Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar");
        $cikti = str_replace($aylarIng, $aylar, $cikti);
        $cikti = str_replace($gunlerIng, $gunler, $cikti);
        return $cikti;
    }

    static function tarih($t, $f = '%d %B %Y, %A %H:%M')
    {//tarihi istenen formatta üretip geri döndürür

        return iconv('latin5', 'utf-8', strftime($f, strtotime($t)));
    }

    static function yetki($y)
    {//yetkiye göre sayfayı görüntüleme iznini kontrol eder
        $y = explode(';', $y);
        if (empty($_SESSION['yetki']) or ($y[0] > 0 and !in_array($_SESSION['yetki'], $y))) die('<div style="padding:10px;font-size:20pt;"><div class="alert alert-danger">Bu sayfayı görüntüleme yetkiniz yok! Anasayfaya yönlendiriliyorsunuz...</div></div><meta http-equiv="refresh" content="1;URL=login.php">');
    }

    static function ucwordstr($metin)
    {//Büyük harf dönüştürücüsü
        return ltrim(mb_convert_case(str_replace(array('I', 'ı', 'İ', 'i'), array('I', 'I', 'İ', 'İ'), $metin), MB_CASE_UPPER, "UTF-8"));
    }

    static function sonhata()
    {//sorgular sonucu oluşan son hatayı dizi olarak döndürür
        $hata = $this->errorInfo();
        if ($hata[0] == 00000) return false;
        return $hata;
    }

    

    static function kontrol($deger, $tip = 'text', $tanimliDeger = "", $tanimsizDeger = "")
    {// degerleri kontrol et temizle
        $deger = trim($deger);
        $deger = (!get_magic_quotes_gpc()) ? addslashes($deger) : $deger;
        switch ($tip) {
            case "blob":
            case "string":
            case "text":
            case "VAR_STRING":
            case "STRING":
            case "BLOB":
                $deger = ($deger != "") ? "'" . $deger . "'" : "NULL";
                break;
            case "long":
            case "int":
            case "LONGLONG":
            case "LONG":
            case "TINY":
            case "SHORT":
                $deger = ($deger != "") ? intval($deger) : "NULL";
                break;
            case "double":
            case "DOUBLE":
                $deger = ($deger != "") ? "'" . doubleval($deger) . "'" : "NULL";
                break;
            case "date":
            case "datetime":
            case "DATETIME":
            case "DATE":
            case "TIMESTAMP":
                $deger = ($deger != "") ? "'" . $deger . "'" : "NULL";
                break;
            case "defined":
                $deger = ($deger != "") ? $tanimliDeger : $tanimsizDeger;
                break;
        }
        return $deger;
    }

    //yapıcı fonksiyon
    public function __construct()
    {
        $this->varsayılan();
        $dns = 'mysql' . ':dbname=' . VT_ADI . ";charset=utf8;host=" . HOST;
        try {
            parent::__construct($dns, VT_KULLANICI, VT_SIFRE);
        } catch (PDOException $e) {
            die('<h3 style="color:red">Hata: ' . $e->getMessage()) . '</h3>';
        }
        //$this->exec("SET NAMES 'utf8'; SET CHARSET 'utf8'");
        $this->exec('SET CHARACTER SET utf8');
        $this->exec('SET NAMES utf8');
        $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    private function varsayılan()
    {
        $this->ip = Db::kontrol($_SERVER['REMOTE_ADDR'], 'text');
        $this->suan = date('d-m-Y G:i:s', strtotime('now'));
        $this->bugun = date('d-m-Y', strtotime('now'));
        $this->buyil = date('Y', strtotime('now'));
    }

    //yıkıcı fonksiyon
    public function __destruct()
    {
        $this->sor = null;
    }

    //seçme işlemi yapan fonksiyon

    /**
     * @param $sutunlar
     * @param $tablolar
     * @param string $sartlar
     * @param string $sirala
     * @param string $limit
     * @return $this
     */
    public function sec($sutunlar, $tablolar, $sartlar = '', $sirala = '', $limit = '')
    {
        $this->sql = "SELECT $sutunlar FROM $tablolar";
        $this->sql .= $sartlar ? " WHERE $sartlar" : '';
        $this->sql .= $sirala ? " ORDER BY $sirala" : '';

        $this->sor = $this->prepare($this->sql);
        try {
            $this->sor->execute();
        } catch (PDOException $e) {
            $this->hata = 'Hata: ' . $e->getMessage();
        }

        $this->say = $this->query("SELECT FOUND_ROWS()")->fetchColumn();

        if ($limit) {
            $request = requestData();

            $this->sayfa = isset($request->page) ? (int)$request->page : 1;
            $this->topsayfa = ceil($this->say / $limit);
            $this->sayfa = ($this->sayfa > $this->topsayfa) ? $this->topsayfa : $this->sayfa;
            $this->sayfa = ($this->sayfa < 1) ? 1 : $this->sayfa;
            $bkayit = ($this->sayfa - 1) * $limit;
            $this->sql .= " LIMIT $bkayit,$limit";
            $this->sor = $this->prepare($this->sql);
            try {
                $this->sor->execute();
            } catch (PDOException $e) {
                $this->hata = 'Hata: ' . $e->getMessage();
            }
        }

        //echo $this->hata?'<h3 style="color:red">'.$this->hata.'</h3>':'';
        return $this;
    }

    //sql çalıştır işlemi yapan fonksiyon
    public function sql($sql)
    {
        $this->sql = $sql;

        $this->sor = $this->prepare($this->sql);
        try {
            $this->sor->execute();
        } catch (PDOException $e) {
            $this->hata = 'Hata: ' . $e->getMessage();
        }

        $this->say = $this->query("SELECT FOUND_ROWS()")->fetchColumn();

        return $this;
    }

    //tablodan bir yada birden fazla satır okur
    public function oku($tek = true)
    {
        return $tek ? $this->sor->fetch(PDO::FETCH_ASSOC) : $this->sor->fetchAll(PDO::FETCH_ASSOC);
    }

   


    public function sor($sql)
    {
        $this->sql = $sql;
        $this->sor = $this->query($this->sql);
        return $this->sor->fetchAll();
    }

    function sil($tablo, $id, $field = 'id')
    {//id ye göre kaydı siler
        $this->sql = "DELETE FROM $tablo WHERE $field='$id'";
        return $this->calistir();
    }

    function calistir()
    {
        $this->sor = $this->exec($this->sql);
        return $this->sor;
    }

    function form_ekle($tablo)
    {//tabloya hızlı form ekleme
        $degerler = $this->deger_olustur($this->tablo_bilgi($tablo), "ekle");
        $this->sql = "INSERT INTO $tablo $degerler";
        return $this->calistir();
    }

    function lastId()
    { // veritabanına son kaydedilen verinin idsini dönderir.
        /*$stmt = $this->query("SELECT LAST_INSERT_ID()");
        $lastId = $this->fetch(PDO::FETCH_NUM);
        return $lastId = $lastId[0];
       *///  $this->lastInsertId();
        //return  $this->lastInsertId();
        $id = $this->sql("SELECT LAST_INSERT_ID()")->oku();
        return $id[0];
    }


    function form_guncelle($tablo, $id, $v = 'id')
    {//id ye göre hızlı güncelleme
        $degerler = $this->deger_olustur($this->tablo_bilgi($tablo), "guncelle");
        $this->sql = "UPDATE $tablo SET $degerler WHERE $v='$id'";
        return $this->calistir();
    }

    function tablo_bilgi($tablo)
    {//tablo alan-adı ve alan tiplerini döndürür
        $this->sql = "SELECT * FROM $tablo";
        $this->sor = $this->query($this->sql);
        $alanSay = $this->sor->columnCount(); //alan-adlarını say
        for ($i = 0; $i < $alanSay; $i++) {
            $meta = $this->sor->getColumnMeta($i);
            $a = @$meta['name']; // alan-adi
            $t = @$meta['native_type']; // alan-tipi
            $alan[] = array($a, $t); //bilgileri diziye ata
        }
        return $alan;
    }

   

    function deger_olustur($tablo, $tip)
    {//güncelleme ve ekleme işlemleri için değerleri uygun biçimde oluşturur
        $s = '';
        $d = '';
        if ($tip == "guncelle") {
            foreach ($tablo as $t) if (isset($_POST[$t[0]])) $d .= $t[0] . '=' . Db::kontrol($_POST[$t[0]], $t[1]) . ',';
            $sondeger = substr($d, 0, -1); // sütun1=değer1,sütun2=değer2
        } elseif ($tip == "ekle") {
            foreach ($tablo as $t) {
                if (isset($_POST[$t[0]])) {
                    $s .= $t[0] . ',';
                    $d .= Db::kontrol($_POST[$t[0]], $t[1]) . ',';
                }
            }
            $s = substr($s, 0, -1);
            $d = substr($d, 0, -1);
            $sondeger = "($s) VALUES ($d)"; // sütunlar VALUES değerler
        }
        return $sondeger;
    }

   
}//class Db

