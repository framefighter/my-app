import { ShoppingCart } from "@mui/icons-material";
import {
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import React from "react";
import { getShopItemColor } from '../style/color';
import { getShopItemIcon } from "../style/icon";
import { Shop } from "../types/robots";

interface ShopListProps {
  shops: Shop[];
}

function ShopList(props: ShopListProps) {
  const shops = props.shops;
  return (
    <List>
      {shops.map((shop: Shop) => {
        const Icon = getShopItemIcon(shop.type);
        return (
          <ListItem button key={shop.id}>
            <ListItemIcon>
              <Badge badgeContent={shop.price} max={10000}>
                <Icon
                  sx={{
                    color: getShopItemColor(shop.type),
                  }}
                />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={shop.name} secondary={shop.description} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default ShopList;
