<!doctype html>
<html>
<head>
    <title>Votre secret : {{ $data['title'] }}</title>
</head>
<body>
<h1>Bonjour {{$data['name']}}</h1>
<div>{{$data['message']}}</div>
<p>Tu peux consulter le secret en cliquant <a href="{{ $data['link'] }}">ici</a></p>
<strong>Le secret sera supprimé de manière définitive une fois consulté.</strong>
</body>
</html>
