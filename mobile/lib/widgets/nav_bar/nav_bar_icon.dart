import 'package:flutter/material.dart';
import '../../constants/themes.dart';

class NavBarIcon extends StatefulWidget {
  final bool isSelected;
  final String label;
  final Function(int a) pageChangeCallback;
  const NavBarIcon(
      {super.key,
      required this.isSelected,
      required this.label,
      required this.pageChangeCallback});

  @override
  State<NavBarIcon> createState() => _NavBarIconState();
}

class _NavBarIconState extends State<NavBarIcon>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Color?> _colorAnimation;
  late Animation _sizeAnimation;

  @override
  void initState() {
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );

    _colorAnimation = ColorTween(begin: Colors.transparent, end: Colors.white)
        .animate(_controller);
    _sizeAnimation = TweenSequence([
      TweenSequenceItem<double>(tween: Tween(begin: 30, end: 32), weight: 100),
    ]).animate(_controller);

    super.initState();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  IconData logo() {
    if (widget.label == 'Profile') {
      return Icons.person;
    } else if (widget.label == 'Favourites') {
      return Icons.star;
    } else if (widget.label == 'Browse') {
      return Icons.folder;
    } else {
      return Icons.home;
    }
  }

  int serialNo() {
    if (widget.label == 'Profile') {
      return 4;
    } else if (widget.label == 'Favourites') {
      return 3;
    } else if (widget.label == 'Browse') {
      return 1;
    } else {
      return 0;
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.isSelected) {
      _controller.reverse();
    } else {
      _controller.forward();
    }

    return Column(
      children: [
        const Spacer(),
        GestureDetector(
          onTap: () {
            widget.pageChangeCallback(serialNo());
          },
          child: AnimatedBuilder(
              animation: _controller,
              builder: (context, _) {
                return Container(
                  padding: const EdgeInsets.all(4.0),
                  decoration: BoxDecoration(
                    borderRadius: const BorderRadius.all(
                      Radius.circular(12.0),
                    ),
                    color: _colorAnimation.value,
                  ),
                  child: Icon(
                    logo(),
                    color: Colors.black,
                    size: _sizeAnimation.value,
                  ),
                );
              }),
        ),
        Text(
          widget.label,
          style: Themes.darkTextTheme.bodySmall,
        ),
        const SizedBox(
          height: 8.0,
        )
      ],
    );
  }
}
