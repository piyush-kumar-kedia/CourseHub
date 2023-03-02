import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:test1/constants/themes.dart';
import 'package:test1/database/hive_store.dart';
import 'package:test1/widgets/favourite_screen/favourite_card.dart';

class FavouritesScreen extends StatelessWidget {
  const FavouritesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final favourites = HiveStore.getFavourites();
    return Scaffold(
        body: favourites.isEmpty
            ? const EmptyList()
            : Padding(
                padding:
                    const EdgeInsets.symmetric(vertical: 20, horizontal: 30),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "FAVOURITES",
                      style: Themes.darkTextTheme.displayLarge,
                    ),
                    const SizedBox(
                      height: 10.0,
                    ),
                    Expanded(
                      child: GridView.builder(
                        physics: const ScrollPhysics(
                            parent: BouncingScrollPhysics()),
                        itemCount: favourites.length,
                        gridDelegate:
                            const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 2,
                                crossAxisSpacing: 20.0,
                                mainAxisSpacing: 2.0),
                        itemBuilder: (context, index) {
                          String myPath =
                              "${favourites[index].path.split("/")[1]} > ${favourites[index].path.split("/")[2]}";
                          return FavouriteCard(
                            index: favourites[index].code.toUpperCase(),
                            address: myPath,
                            name: favourites[index].name.length >= 30
                                ? "${favourites[index].name.substring(0, 30)} ...${favourites[index].name.substring(favourites[index].name.length - 4, favourites[index].name.length)}"
                                : favourites[index].name,
                          );
                        },
                      ),
                    ),
                    Visibility(
                        visible: favourites.length <= 4,
                        child: Center(
                            child: SvgPicture.asset('assets/favourites.svg')))
                  ],
                ),
              ));
  }
}

class EmptyList extends StatelessWidget {
  const EmptyList({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Nothing Here!',
            style: Themes.darkTextTheme.displayLarge,
          ),
          const SizedBox(
            height: 15,
          ),
          const Text(
            'Click on the "star" icon next to any\n file to add files to your favourites',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontWeight: FontWeight.w400,
              color: Color.fromRGBO(108, 108, 108, 1),
              fontSize: 14.0,
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          SvgPicture.asset(
            "assets/my_profile_no_contri.svg",
            fit: BoxFit.fill,
            alignment: Alignment.center,
          ),
        ],
      ),
    );
  }
}
