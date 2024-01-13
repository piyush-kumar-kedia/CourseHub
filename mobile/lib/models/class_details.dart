import 'dart:convert';

ClassDetails classDetailsFromJson(String str) =>
    ClassDetails.fromJson(json.decode(str));

String classDetailsToJson(ClassDetails data) => json.encode(data.toJson());

class ClassDetails {
  String id;
  String location;
  DateTime startTime;
  String professor;
  DateTime endTime;

  ClassDetails({
    required this.id,
    required this.location,
    required this.startTime,
    required this.endTime,
    required this.professor,
  });

  factory ClassDetails.fromJson(Map<dynamic, dynamic> json) => ClassDetails(
        id: json["id"],
        location: json["location"],
        startTime: DateTime.parse(json["startdate"]),
        endTime: DateTime.parse(json["enddate"]),
        professor: json["professor"],
      );

  Map<dynamic, dynamic> toJson() => {
        "id": id,
        "location": location,
        "startdate": startTime.toIso8601String(),
        "enddate": endTime.toIso8601String(),
        "professor": professor,
      };
}
