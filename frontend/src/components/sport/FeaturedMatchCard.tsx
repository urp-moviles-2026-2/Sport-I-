import { Image, Text, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';
import { FeaturedMatchCardStyles as s } from '@/theme';
import { PrimaryButton } from './PrimaryButton';
import { StatusBadge } from './StatusBadge';

export type FeaturedMatchCardProps = {
  status: string;
  spots: string;
  tag: string;
  title: string;
  venue: string;
  priceLabel: string;
  price: string;
  perk: string;
  ctaLabel: string;
  imageSource?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  onJoin: () => void;
};

/** Pichanga destacada con foto de fondo, cuota y botón para unirse. Sin `imageSource` muestra un fondo liso. */
export function FeaturedMatchCard({ status, spots, tag, title, venue, priceLabel, price, perk, ctaLabel, imageSource, style, onJoin }: FeaturedMatchCardProps) {
  return (
    <View style={[s.card, style]}>
      <View style={s.photo}>
        {!!imageSource && <Image accessible={false} source={imageSource} style={s.photoImage} />}
        <View accessible={false} style={s.shade} />
        <View style={s.photoTop}>
          <StatusBadge label={status} tone="neutral" />
          <StatusBadge label={spots} tone="solid" />
        </View>
        <View>
          <Text style={s.tag}>{tag}</Text>
          <Text accessibilityRole="header" numberOfLines={1} style={s.title}>{title}</Text>
        </View>
      </View>
      <View style={s.body}>
        <Text style={s.venue}>▦ {venue}</Text>
        <View style={s.priceRow}>
          <View>
            <Text style={s.priceLabel}>{priceLabel}</Text>
            <View style={s.priceLine}><Text style={s.price}>{price}</Text><Text style={s.unit}>c/u</Text></View>
          </View>
          <View style={s.perk}><Text style={s.perkText}>✓ {perk}</Text></View>
        </View>
        <PrimaryButton label={`${ctaLabel}`} variant="orange" onPress={onJoin} />
      </View>
    </View>
  );
}
