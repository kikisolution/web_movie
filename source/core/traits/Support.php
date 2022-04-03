<?php

namespace Source\core\traits;

trait Support
{
    public static function cursRequest(string $url, string $port, string $method, string $token = null, array $data = null): array
    {

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_PORT => $port,
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_POSTFIELDS => http_build_query($data),
            CURLOPT_COOKIE => "PHPSESSID=".$_COOKIE['PHPSESSID'],
            CURLOPT_HTTPHEADER => array(
                "Cache-Control: no-cache",
                'Authorization: Bearer ' . $token
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {

            $arrResponse = [
                "status" => "error",
                "response" => "cURL Error #:" . $err
            ];
            return $arrResponse;

        } else {

            $arrResponse = [
                "status" => "success",
                "response" => $response
            ];
            return $arrResponse;

        }

    }
}