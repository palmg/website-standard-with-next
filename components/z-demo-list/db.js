import {net} from '../../util/net'


export async function loadTvList(page, number) {
    return net('https://api.tvmaze.com/search/shows?q=batman');
};