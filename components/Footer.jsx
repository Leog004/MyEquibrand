import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer class="relative pt-10 pb-6" style={{backgroundColor: '#202020'}}>
        <div class="container mx-auto px-4 max-w-5xl">
          <div class="flex flex-wrap text-left lg:text-left">
            <div class="w-full lg:w-6/12 px-4">
              <h4 class="text-3xl fonat-semibold text-white">Let's keep in touch!</h4>
              <h5 class="text-md mt-0 mb-2 text-gray-400">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div class="mt-6 lg:mb-0 mb-6">
                <img src="http://www.myequibrand.com/img/MyEquibrand_Brand_White.png" style={{ height: '24px', marginTop: '10px', marginBottom: '10px'}} alt="logo" />             
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="flex flex-wrap items-top mb-6">
                <div class="w-full lg:w-4/12 px-4 ml-auto">
                  <span class="block uppercase text-gray-400 text-sm font-semibold mb-2">Useful Links</span>
                  <ul class="list-unstyled">
                    <li>
                      <a class="text-white hover:text-gray-500 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/presentation?ref=njs-profile">About Us</a>
                    </li>
                    <li>
                      <a class="text-white hover:text-gray-500 font-semibold block pb-2 text-sm" href="https://blog.creative-tim.com?ref=njs-profile">Blog</a>
                    </li>
                    <li>
                      <a class="text-white hover:text-gray-500 font-semibold block pb-2 text-sm" href="https://www.github.com/creativetimofficial?ref=njs-profile">Github</a>
                    </li>
                    <li>
                      <a class="text-white hover:text-gray-500 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile">Free Products</a>
                    </li>
                  </ul>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                  <span class="block uppercase text-gray-400 text-sm font-semibold mb-2">Other Resources</span>
                  <ul class="list-unstyled">
                    <li>
                      <a class="text-white hover:text-gray-500 font-semibold block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">MIT License</a>
                    </li>
                    <li>
                      <a class="text-white hover:text-gray-500 font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">Terms &amp; Conditions</a>
                    </li>
                    <li>
                      <a class="text-white hover:text-gray-500 font-semibold block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">Privacy Policy</a>
                    </li>
                    <li>
                      <a class="text-white hover:text-gray-500 font-semibold block pb-2 text-sm" href="https://creative-tim.com/contact-us?ref=njs-profile">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-6 border-blueGray-300" />
          <div class="flex flex-wrap items-center md:justify-between justify-center">
            <div class="w-full md:w-4/12 px-4 mx-auto text-center">
              <div class="text-sm text-gray-300 font-semibold py-1">
                Copyright © <span id="get-current-year">2021</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
}
