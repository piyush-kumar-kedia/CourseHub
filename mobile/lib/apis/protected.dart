import 'package:shared_preferences/shared_preferences.dart';

Future<String> getAccessToken() async {
  final prefs = await SharedPreferences.getInstance();
  const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNmMWY3OTFlY2M3MTE3MTUwNmVmNjA5IiwiaWF0IjoxNjc2ODIxMDM1LCJleHAiOjE2Nzg4OTQ2MzV9.lOaH_EDVznSSfkXoow6h4jWwvj3HDUk-Fb40YW3r6qA';

  if (token != null) {
    return 'Token $token';
  } else {
    return 'error';
  }
}
