import 'package:http/http.dart' as http;
import 'package:test1/apis/endpoints.dart';

Future<void> getContribution() async {
  final res = http.post(Uri.parse(Contributions.fileUpload),);
}
