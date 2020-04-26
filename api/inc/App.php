<?php
/**
 * Created by PhpStorm.
 * User: emrahyurttutan
 * Date: 16.12.2018
 * Time: 18:21
 *
 *
 * Router::get('/sayfa/([a-zA-Z]+)', function($isim) {
echo "Gelen değer: ". $isim;
});
Router::get('/uyelik/.*', 'KayitOl');

 */

class Router
{
    public static $routes = [];
    public static $methods = [];
    public static $callbacks = [];

    //Aşırı Yükleme
    public static function __callstatic($method, $params)
    {
        // Rotaları saklar.
        array_push(self::$routes, $params[0]);
        // Http yöntemlerini saklar. GET, POST, PUT ...
        array_push(self::$methods, strtoupper($method));
        //Geri çağırım dizisi, sınıf isimlerini ve anonim fonksiyon parametrelerini saklar.

        array_push(self::$callbacks, $params[1]);
    }

    public static function run()
    {
        /**
         * Eğer projeniz kök dizinde değilse, onun düzeltmesini uygular.
         *
         * Örneğin: Projeniz projem klasörü altındaysa ve sayfa1 adında rota tanımlarsanız.
         * Rotanız /sayfa1, $_SERVER['REQUEST_URI'] değişkeninin karşılığ /projem/sayfa1 olacaktır.
         *  if(/sayfa1 == /projem/sayfa1) sorgusu false döneceği için rotanız çalışmayacaktır.
         *  Aşağıdaki kod kümesi $path değişkenine istediğimiz formatı göndercektir.
         */
        $req_uri = $_SERVER['REQUEST_URI'];
        if (substr($req_uri, 0, strlen(\ROOTFOLDER) + 1) === \ROOTFOLDER . '/') {
            $path = substr($req_uri, strlen(\ROOTFOLDER));
        } else {
            $path = $req_uri;
        }

        $uri = urldecode(parse_url($path, PHP_URL_PATH));

        foreach (self::$routes as $routeKey => $route) {

            // 404 - Sayfa bulunamadı kontrolü için
            $found_route = false;
            // preg_match(); Bir düzenli ifadeyi(Regex) eşleştirmeye çalışır.
            if (preg_match('~^' . $route . '$~', $uri, $matched) && self::$methods[$routeKey] == $_SERVER['REQUEST_METHOD']) {
                $found_route = true;
                $routingDefinition = self::$callbacks[$routeKey];
                $parts = explode('/', $matched[0]);
                array_shift($parts);
                //Anonim fonksiyonu çağırır.

                @call_user_func_array($routingDefinition, $parts);
                //Döngüden Çıkar.
                break;

            }

        }

        if ($found_route == false) {
           echo prepare_json('404 - Sayfa bulunamadı',400);
        }


    }
}