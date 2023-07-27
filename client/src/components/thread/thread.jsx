import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { LuRepeat2, LuSend } from "react-icons/lu";

const Thread = () => {
  return (
    <div className="flex gap-4 border-y border-solid dark:border-gray-100/20 py-6">
      <div>
        <img className="rounded-full w-60" src="/user.jpg" alt="" />
      </div>
      <div>
        <div className="hover:underline cursor-pointer font-semibold mb-2">
          mr_asqarbek
        </div>
        <p className="text-base text-justify mb-3">
          Loyiha namoyishi: Movie web app Obuna rejasi bilan Full Stack ilovasi.
          Mijoz tizimga kirishi va ilovada ro'yxatdan o'tishi mumkin, ammo
          to'lov rejasisiz ular bizning platformamizdan to'liq foydalana
          olmaydi. Biz har bir himoyalangan sahifadan foydalanganmiz. Ro'yxatdan
          o'tgandan so'ng, foydalanuvchi uchta rejadan bittasini sotib olishi
          kerak. Bizda Stripe bilan birlashtirilgan to'lov mavjud.
        </p>
        <img className="rounded-xl mb-5" src="/post.jpg" alt="" />
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <AiOutlineHeart className="text-2xl cursor-pointer" />
            <span className="text-sm text-gray-400">110</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegComment className="text-xl cursor-pointer" />
            <span className="text-sm text-gray-400">110</span>
          </div>
          <div className="flex items-center gap-1">
            <LuRepeat2 className="text-2xl cursor-pointer" />
            <span className="text-sm text-gray-400">110</span>
          </div>
          <div className="flex items-center gap-1">
            <LuSend className="text-xl cursor-pointer" />
            <span className="text-sm text-gray-400">110</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thread;
