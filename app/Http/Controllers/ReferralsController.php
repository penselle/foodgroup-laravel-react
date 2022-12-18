<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\User;
use App\Models\Invited;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;

class ReferralsController extends Controller
{
    //

    private $max_invites = 10;

    public function create()
    {
        $data['referrals']      = $this->getTotalInvites();
        $data['max_invites']    = $this->max_invites;
        $data['alert']          = session('alert');

        return Inertia::render('Referrals', $data);
    }

    public function invite(Request $request)
    {
        if ($this->getTotalInvites() < $this->max_invites)
        {
            $request->validate(
                ['email' => 'required|email|unique:users|unique:invited'],
                ['email.unique'=> 'Email has already been invited or registered in the platform']
            );

            $details = [
                'body' => 'Hi im ' . Auth::user()->name . ', i am inviting you to join my group, please register using this link ' . url('/register') . '?refer=' . Auth::user()->id
            ];
    
            Mail::to($request->email)->send(new SendMail($details));
            Invited::create(['email' => $request->email]);

            $alert = '<p>' . $details['body'] . '</p>This message was also sent via email';
        }
        else
        {
            $alert = 'You have reached the maximum numbers of referrals';
        }

        session()->flash('alert', $alert);
        return redirect('referrals');
    }

    private function getTotalInvites()
    {
        return User::where('referral_id', Auth::user()->id)->count();
    }
}
