extension StringCasingExtension on String {
  String toCapitalized() => length > 0 ?'${this[0].toUpperCase()}${substring(1).toLowerCase()}':'';
  String toTitleCase() => replaceAll(RegExp(' +'), ' ').split(' ').map((str) => str.toCapitalized()).join(' ');
}



class Course {
  final String code;
  final String name;

  Course({required this.code, required this.name});

  factory Course.fromJson(Map<String, dynamic> parsedJson) {
    String code = parsedJson["code"];
    code = code.toUpperCase();
    code = "${code.substring(0, 2)} ${code.substring(2, code.length)}";
    String name = parsedJson["name"];
    name = name.toTitleCase();
    return Course(
      code: code,
      name: name,
    );
  }
}
