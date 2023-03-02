import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:test1/constants/themes.dart';

class FavouriteCard extends StatelessWidget {
  final String index;
  final String address;
  final String name;
  const FavouriteCard({
    super.key,
    required this.index,
    required this.address,
    required this.name,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        SvgPicture.asset(
          'assets/favourites_card.svg',
          alignment: Alignment.center,
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
        ),
        Positioned(
          top: 24,
          left: 12,
          child: Column(
            children: [
              SizedBox(
                width: 120,
                child: Text(address, style: Themes.darkTextTheme.bodySmall),
              ),
              const SizedBox(
                height: 8.0,
              ),
              SizedBox(
                width: 120,
                child: Text(name, style: Themes.darkTextTheme.labelLarge),
              ),
            ],
          ),
        ),
        Positioned(
          bottom: 24,
          right: 16,
          child: SizedBox(
            width: 100,
            child: Text(index,
                textAlign: TextAlign.right,
                style: const TextStyle(
                  fontFamily: "ProximaNova",
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: Color.fromRGBO(0, 0, 0, 0.25),
                )),
          ),
        )
      ],
    );
  }
}
