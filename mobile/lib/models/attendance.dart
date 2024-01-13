import 'dart:convert';

import 'package:coursehub/models/schedule.dart';

ClassDetails classDetailsFromJson(String str) =>
    ClassDetails.fromJson(json.decode(str));

String classDetailsToJson(ClassDetails data) => json.encode(data.toJson());

class ClassDetails {
  int totalclasses;
  int classesattended;
  int percentageCompulsory;
  String id;
  Schedule schedule;

  ClassDetails({
    required this.id,
    required this.totalclasses,
    required this.classesattended,
    required this.percentageCompulsory,
    required this.schedule,
  });

  factory ClassDetails.fromJson(Map<dynamic, dynamic> json) => ClassDetails(
    id: json["id"],
    classesattended: json["classesattended"],
    percentageCompulsory: json["percentageCompulsory"],
    totalclasses: json["totalclasses"],
    schedule: Schedule.fromJson(json["schedule"]),
  );

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "classesattended": classesattended,
      "percentageCompulsory": percentageCompulsory,
      "totalclasses": totalclasses,
      "schedule": schedule.toJson(),
    };
  }


}
