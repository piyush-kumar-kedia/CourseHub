import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:test1/constants/themes.dart';
import 'package:test1/widgets/browser_nav_crumb.dart';
import 'package:test1/widgets/folder_explorer.dart';

import '../apis/courses/course_api.dart';

class BrowseScreen extends StatefulWidget {
  final String code;
  final Function(int a) callback;

  const BrowseScreen({super.key, required this.code, required this.callback});
  @override
  State<StatefulWidget> createState() => _BrowseScreen();
}

class _BrowseScreen extends State<BrowseScreen> {
  String path = "Home/";
  String year = "";
  List<String> availableYears = [];

  void addToPathCallback(String p) {
    setState(() {
      path += '$p/';
    });
  }

  void handleClick(String value) {
    setState(() {
      year = value;
      path = "Home/";
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
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
        Map<String, dynamic> data = snapshot.data!;
        List<String> pathArgs = path.split("/");

        availableYears.clear();
        String lastYear = "";
        for (var c in data["children"]) {
          availableYears.add(c["name"]);
          lastYear = c["name"];
        }

        if (year == "") {
          year = lastYear;
        }

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
                callback: (level) => widget.callback(0),
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
        return Column(
          children: [
            Container(
              color: const Color.fromRGBO(254, 207, 111, 1),
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
              color: const Color.fromRGBO(254, 207, 111, 1),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(24.0, 8.0, 24.0, 12.0),
                child: Row(
                  children: [
                    Text(
                      currentTitle,
                      style: const TextStyle(
                        fontFamily: "ProximaNova",
                        fontSize: 24.0,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const Spacer(),
                    IconButton(
                        icon: const Icon(
                          Icons.star,
                          size: 30.0,
                        ),
                        color: const Color(0x7F000000),
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              action: SnackBarAction(
                                label: "UNDO",
                                onPressed: () {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                          behavior: SnackBarBehavior.floating,
                                          margin:
                                              EdgeInsets.only(bottom: 125.0),
                                          duration: Duration(seconds: 1),
                                          content: Text('UNDO SUCCESSFUL!')));
                                },
                              ),
                              behavior: SnackBarBehavior.floating,
                              margin: const EdgeInsets.only(bottom: 125.0),
                              duration: const Duration(seconds: 1),
                              content: const Text('Added to Favourites!'),
                            ),
                          );
                          //TODO action of fav
                        }),
                    const SizedBox(
                      width: 8.0,
                    ),
                    IconButton(
                        icon: const Icon(
                          Icons.share,
                          size: 30.0,
                        ),
                        color: const Color(0x7F000000),
                        onPressed: () {
                          // TODO create share link
                          String link = "link";
                          Clipboard.setData(ClipboardData(
                            text: link,
                          )).then((_) {
                            ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                    behavior: SnackBarBehavior.floating,
                                    margin: EdgeInsets.only(bottom: 125.0),
                                    duration: Duration(seconds: 1),
                                    content: Text(
                                        'Share link copied to your clipboard!')));
                          });
                        }),
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
            Container(
              color: Colors.black,
              height: 60,
              padding: const EdgeInsets.symmetric(vertical: 0, horizontal: 30),
              child: Row(
                children: [
                  Text(
                    'YEAR',
                    style: Themes.theme.textTheme.labelMedium,
                  ),
                  const Spacer(),
                  Container(
                    color: Colors.white,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 5.0, horizontal: 10.0),
                      child: Row(
                        children: [
                          Text(
                            year,
                            style: const TextStyle(
                              color: Colors.black,
                            ),
                          ),
                          PopupMenuButton<String>(
                            onSelected: handleClick,
                            itemBuilder: (context) {
                              return availableYears.map((String choice) {
                                return PopupMenuItem<String>(
                                  value: choice,
                                  child: Text(choice),
                                );
                              }).toList();
                            },
                            child: const Icon(
                              Icons.keyboard_arrow_down,
                              color: Colors.black,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            )
          ],
        );
      },
    );
  }
}
