import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'package:test1/screens/login_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _status = '';

  void authenticate() async {
    var clientid = 'c6c864ac-cced-4be6-8657-ca15170e7b51';
    var redirect_uri =
        'https://coursehub-api.onrender.com/api/auth/login/redirect';

    final url =
        'https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/oauth2/v2.0/authorize?client_id=89fc28dc-5aaf-471b-a9bf-f7411b5527f7&response_type=code&redirect_uri=https://coursehub-api.onrender.com/api/auth/login/redirect&scope=offline_access%20user.read&state=12345&prompt=consent';
    final callbackUrlScheme = 'foobar';

    try {
      final result = await FlutterWebAuth.authenticate(
          url: url, callbackUrlScheme: callbackUrlScheme);
      setState(() {
        _status = 'Got result: $result';
        print(result);
      });
    } on PlatformException catch (e) {
      setState(() {
        _status = 'Got error: $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: LoginScreen(callback: authenticate,)
    );
  }
}
