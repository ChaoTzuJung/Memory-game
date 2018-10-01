// 方法函式庫中的 - 隨機取出config內的正列的icon跟顏色
// 方法函式庫中的 - 產出一定數量且不重複icon組合(出考題/選項)

import _ from 'lodash';
import config from '../config';

const { iconNames, iconColors } = config;

export const randomIconName = () => {
    const nameIndex = _.random(iconNames.MaterialCommunityIcons.length - 1);
    console.log(nameIndex);
    return iconNames.MaterialCommunityIcons[nameIndex];
};

export const randomIconColor = () => {
    const colorIndex = _.random(iconColors.length - 1);
    return iconColors[colorIndex];
}

export const createUniqRandomIcons = (num, iconItem = []) => {
    const uniqIconBoxs = [...iconItem];
    while(uniqIconBoxs.length < num) {
        const newRandomIcon = {
            name: randomIconName(),
            color: randomIconColor()
        }
        //偵測有無重複
        if(_.find(uniqIconBoxs, newRandomIcon) === undefined) {
            uniqIconBoxs.push(newRandomIcon);
        }
    }
    return uniqIconBoxs;
}