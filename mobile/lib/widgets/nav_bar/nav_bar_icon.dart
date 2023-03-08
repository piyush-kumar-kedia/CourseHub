import 'package:flutter/material.dart';
import '../../constants/themes.dart';

class NavBarIcon extends StatelessWidget {
  final bool isSelected;
  final String label;
  final Function(int a) pageChangeCallback;
  const NavBarIcon(
      {super.key,
      required this.isSelected,
      required this.label,
      required this.pageChangeCallback});

  IconData logo() {
    if (label == 'Profile') {
      return Icons.person;
    } else if (label == 'Favourites') {
      return Icons.star;
    } else if (label == 'Browse') {
      return Icons.folder;
    } else {
      return Icons.home;
    }
  }

  int serialNo() {
    if (label == 'Profile') {
      return 4;
    } else if (label == 'Favourites') {
      return 3;
    } else if (label == 'Browse') {
      return 1;
    } else {
      return 0;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Spacer(),
        GestureDetector(
          onTap: () {
            pageChangeCallback(serialNo());
          },
          child: Container(
            padding: const EdgeInsets.all(4.0),
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(
                Radius.circular(12.0),
              ),
              color: (isSelected) ? Colors.white : Colors.transparent,
            ),
            child: Icon(
              logo(),
              color: Colors.black,
              size: 30.0,
            ),
          ),
        ),
        Text(
          label,
          style: Themes.darkTextTheme.bodySmall,
        ),
        const SizedBox(
          height: 8.0,
        )
      ],
    );
  }
}
