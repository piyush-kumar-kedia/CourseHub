import 'package:flutter/material.dart';
import 'package:test1/widgets/browser_nav_crumb.dart';
import 'package:test1/widgets/folder_explorer.dart';

import '../util/api/course_api.dart';

class BrowseScreen extends StatefulWidget {
  final String code;
  final Function() callback;

  const BrowseScreen({super.key, required this.code, required this.callback});
  @override
  State<StatefulWidget> createState() => _BrowseScreen();
}

class _BrowseScreen extends State<BrowseScreen> {
  String path = "Home/";
  String year = "2020";

  void addToPathCallback(String p) {
    setState(() {
      path += '$p/';
    });
  }

  void removeFromPath(int level) {
    List<String> pathArgs = path.split("/");
    String newPath = "";
    for (int i = 0; i < level; i++) {
      newPath += "${pathArgs[i]}/";
    }
    setState(() {
      path = newPath;
    });
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: CourseApiClient.getCourseDetail(widget.code),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return Center(
            child: CircularProgressIndicator(),
          );
        }
        Map<String, dynamic> data = snapshot.data!;
        List<String> pathArgs = path.split("/");

        Map<String, dynamic> dataToShow = data;
        List<Widget> navigation_crumbs = [];
        String currentTitle = widget.code.toUpperCase();
        int level = 1;
        for (var p in pathArgs) {
          if (p == "") continue;
          if (p == "Home") {
            for (var child in dataToShow["children"]) {
              if (child["name"] == year) {
                dataToShow = child;
                break;
              }
            }
            navigation_crumbs.add(
              BrowserNavCrumb(
                name: "Home",
                level: 0,
                callback: (level) => widget.callback(),
              ),
            );
            navigation_crumbs.add(
              BrowserNavCrumb(
                name: widget.code.toUpperCase(),
                level: level,
                callback: removeFromPath,
              ),
            );
          } else {
            for (var child in dataToShow["children"]) {
              if (child["name"] == p) {
                dataToShow = child;
                break;
              }
            }
            navigation_crumbs.add(
              BrowserNavCrumb(
                name: p,
                level: level,
                callback: removeFromPath,
              ),
            );
            currentTitle = p;
          }
          level++;
        }
        navigation_crumbs.removeLast();
        return Container(
          child: Column(
            children: [
              Container(
                color: Color.fromRGBO(254, 207, 111, 1),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  child: SingleChildScrollView(
                    child: Row(
                      children: navigation_crumbs,
                    ),
                  ),
                ),
              ),
              Container(
                color: Color.fromRGBO(254, 207, 111, 1),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 24.0, vertical: 8.0),
                  child: Row(
                    children: [
                      Text(
                        currentTitle,
                        style: TextStyle(
                          fontFamily: "ProximaNova",
                          fontSize: 24.0,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      Spacer(),
                      Icon(
                        Icons.star,
                        color: Color(0x7F000000),
                        size: 30.0,
                      ),
                      SizedBox(
                        width: 8.0,
                      ),
                      Icon(
                        Icons.share,
                        color: Color(0x7F000000),
                        size: 30.0,
                      ),
                    ],
                  ),
                ),
              ),
              Expanded(
                child: FolderExplorer(
                  data: dataToShow,
                  callback: addToPathCallback,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
